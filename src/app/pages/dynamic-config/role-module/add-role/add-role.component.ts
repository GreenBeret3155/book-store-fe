import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {getFormValidationErrors, trimRequired} from '../../../validator';
import {RoleService} from '../../../../shared/services/role.service';
import {TranslateService} from '@ngx-translate/core';
import {customerNumberValidator} from '../../../../shared/directives/custome-number.directive';
import {ModuleService} from '../../../../shared/services/module.service';
import {TreeviewConfig, TreeviewItem} from 'ngx-treeview';
import {ToasterService, ToasterConfig} from 'angular2-toaster';

@Component({
  selector: 'ngx-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddRoleComponent implements OnInit {
  title: string;
  data: any;
  formRole: FormGroup;
  item: TreeviewItem[];
  treeViewConfig = TreeviewConfig.create({
    hasFilter: true,
    hasAllCheckBox: false,
    maxHeight: 300,
    hasCollapseExpand: true,
  });

  toasterConfig: ToasterConfig = new ToasterConfig({
    animation: 'flyRight',
    newestOnTop: true
  });

  constructor(private translate: TranslateService,
              protected ref: NbDialogRef<AddRoleComponent>,
              private toastr: NbToastrService,
              private moduleService: ModuleService,
              private toastrService: ToasterService,
              private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.moduleService.getTreeParentActive().subscribe(data => {
      this.item = this.formatDataTree(data.body, 0);
    });
  }
  formatDataTree(data, parentId) {
    const arr = [];
    for (let i = 0; i < data.length; i++) {
      const dataItem = data[i];
      if (dataItem.parentId === parentId) {
        let children = [];
        if (dataItem.id != null) {
          children = this.formatDataTree(data, dataItem.id);
        }
        if (children.length > 0) {
          dataItem.children = children;
          dataItem.isHidden = true;
        } else {
          dataItem.children = null;
          dataItem.isHidden = false;
        }
        const dataTreeview = new TreeviewItem( {text: dataItem.name, value: {id: dataItem.id, isHidden: dataItem.isHidden}, children: dataItem.children});
        arr.push(dataTreeview);
      }
    }
    return arr;
  }

  touchDropdown() {
    this.formRole.get('defaultModule').markAsTouched();
  }

  parentIdChange($event) {
    if ($event) {
      this.formRole.get('defaultModule').setValue($event.id);
    } else {
      this.formRole.get('defaultModule').setValue($event);
    }
  }

  initForm() {
    if (this.data) {
      this.formRole = new FormGroup({
        code: new FormControl( this.data.code, [trimRequired, Validators.maxLength(200)]),
        name: new FormControl(this.data.name, [trimRequired, Validators.maxLength(250)]),
        description: new FormControl(this.data.description, [Validators.maxLength(500)]),
        status: new FormControl(this.data.status, [Validators.required]),
        defaultModule: new FormControl(this.data.defaultModule, [Validators.required]),
        priorityLevel: new FormControl(this.data.priorityLevel, [Validators.maxLength(10), customerNumberValidator(/^[0-9]*$/)])
      });
    } else {
      this.formRole = new FormGroup({
        code: new FormControl( null, [trimRequired, Validators.maxLength(200)]),
        name: new FormControl(null, [trimRequired, Validators.maxLength(250)]),
        description: new FormControl(null, [Validators.maxLength(500)]),
        status: new FormControl(null, [Validators.required]),
        defaultModule: new FormControl(null, [Validators.required]),
        priorityLevel: new FormControl(null, [Validators.maxLength(10), customerNumberValidator(/^[0-9]*$/)])
      });
    }
  }

  cancel() {
    this.ref.close();
  }

  messangeError(error) {
    let mess;
    if (error.status === 400 && error.error.title) {
      mess = error.error.title;
    } else {
      mess = this.toastrService.pop('error', this.translate.instant('common.notify.notification'), this.translate.instant('role_module.unknown_error') );
        // this.toastr.danger(this.translate.instant('role_module.unknown_error'),
        // this.translate.instant('user.title_notification'));
    }
    this.toastrService.pop('error', this.translate.instant('common.notify.notification'), mess );
  }

  submit() {
    this.formRole.markAllAsTouched();
    if (this.formRole.valid) {
      const data = Object.assign({}, this.formRole.value);
      if (this.data == null) {
        this.roleService.insert(data).subscribe(
          (value) => this.ref.close(value),
          (error) => this.messangeError(error),
        );
      } else {
        data.id = this.data.id ;
        this.roleService.update(data).subscribe(
          (value) => this.ref.close(value),
          (error) => this.messangeError(error),
        );
      }
    } else {
      const error = getFormValidationErrors(this.formRole.controls).shift();
      this.toastrService.pop('error', this.translate.instant('common.notify.notification'), this.getValueRoleError(error.controlName, error.errorName) );
      // this.toastr.danger(this.getValueRoleError(error.controlName, error.errorName),
      //   this.translate.instant('user.title_notification'));
    }
  }

  getValueRoleError(control, key) {
    return this.translate.instant('role_module.error.' + control + '.' + key);
  }

  getError(control: string) {
    const key = Object.keys(this.formRole.get(control).errors).shift();
    return this.getValueRoleError(control, key);
  }

  numericOnly(event): boolean { // restrict e,+,-,E characters in  input type number
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode === 48 || charCode === 49 || charCode === 50 || charCode === 51 || charCode === 52 || charCode === 53 || charCode === 54 || charCode === 55 || charCode === 56 || charCode === 57) {
      return true;
    }
    return false;

  }

}
