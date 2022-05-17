import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {
  getFormValidationErrors,
  trimRequired,
} from '../../../validator';
import {ModuleService} from '../../../../shared/services/module.service'
import {TranslateService} from '@ngx-translate/core';
import {TreeviewConfig, TreeviewItem} from 'ngx-treeview';
import {customerNumberValidator} from '../../../../shared/directives/custome-number.directive';
import {ToasterService, ToasterConfig} from 'angular2-toaster';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-add-module',
  templateUrl: 'addModule.component.html',
  styleUrls: ['addModule.component.scss'],
})
export class AddModuleComponent implements OnInit {
  title: string;
  inputModule: FormGroup;
  data: any;
  loading = false;
  item: TreeviewItem[] = [];
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


  constructor(protected ref: NbDialogRef<AddModuleComponent>,
              private moduleService: ModuleService,
              private toastr: NbToastrService,
              private toastrService: ToasterService,
              private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.moduleService.getTreeParent().subscribe(data => {
      this.item = this.formatDataTree(data.body, 0);
    });
    this.ngAfterViewInit();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      document.getElementById('module-code-save').focus();
    }, 100);
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
        } else {
          dataItem.children = null;
        }
        const dataTreeview = new TreeviewItem({text: dataItem.name, value: dataItem.id, children: dataItem.children});
        arr.push(dataTreeview);
      }
    }
    return arr;
  }

  getError(control: string) {
    const key = Object.keys(this.inputModule.get(control).errors).shift();
    return this.getValueModuleError(control, key);
  }

  initForm() {
    if(this.data){
      this.inputModule = new FormGroup({
        id: new FormControl(this.data.id, []),
        code: new FormControl(this.data.code, [trimRequired, Validators.maxLength(200)]),
        name: new FormControl(this.data.name, [trimRequired, Validators.maxLength(250)]),
        pathUrl: new FormControl(this.data.pathUrl, [Validators.maxLength(500)]),
        icon: new FormControl(this.data.icon, [Validators.maxLength(255)]),
        status: new FormControl(this.data.status === 1, [Validators.required]),
        description: new FormControl(this.data.description, [Validators.maxLength(500)]),
        parentId: new FormControl(this.data.parentId ? this.data.parentId === 0 ? null : this.data.parentId : null, []),
        position: new FormControl(this.data.position, [Validators.maxLength(10), Validators.min(0), customerNumberValidator(/^[0-9]*$/)])
      }, {});
    }else{
      this.inputModule = new FormGroup({
        id: new FormControl(undefined, []),
        code: new FormControl(undefined, [trimRequired, Validators.maxLength(200)]),
        name: new FormControl(undefined, [trimRequired, Validators.maxLength(250)]),
        pathUrl: new FormControl(undefined, [Validators.maxLength(500)]),
        icon: new FormControl(undefined, [Validators.maxLength(255)]),
        status: new FormControl(true, [Validators.required]),
        description: new FormControl(undefined, [Validators.maxLength(500)]),
        parentId: new FormControl(undefined ? this.data.parentId === 0 ? null : this.data.parentId : null, []),
        position: new FormControl(undefined, [Validators.maxLength(10), Validators.min(0), customerNumberValidator(/^[0-9]*$/)])
      }, {});
    }
    
  }
  parentIdChange($event) {
    this.inputModule.get('parentId').setValue($event);
  }
  cancel() {
    this.ref.close();
  }

  getValueModuleError(control, key) {
    return this.translate.instant('module.error.' + control + '.' + key);
  }

  submit() {
    this.inputModule.markAllAsTouched();
    if (this.inputModule.valid) {
      this.loading = true;
      const moduleItem = Object.assign({}, this.inputModule.value);
      if (this.inputModule.get('status').value) {
        moduleItem.status = 1;
      } else {
        moduleItem.status = 0;
      }
      if (this.inputModule.get('parentId').value == null) {
        moduleItem.parentId = 0;
      }
      if (this.data == null) {
        this.moduleService.insert(moduleItem).subscribe(
          (value) => this.ref.close(value),
          (error) => {
            this.toastrService.pop('error', this.translate.instant('common.notify.notification'), error.error.title );
            this.loading = false;
          },
          () => this.loading = false,
        );
      } else {
        this.moduleService.update(moduleItem).subscribe(
          (value) => this.ref.close(value),
          (error) => {
            this.toastrService.pop('error', this.translate.instant('common.notify.notification'), error.error.title );
            this.loading = false;
          },
          () => this.loading = false,
        );
      }
    } else {
      const error = getFormValidationErrors(this.inputModule.controls).shift();
      this.toastrService.pop('error', this.translate.instant('common.notify.notification'), this.getValueModuleError(error.controlName, error.errorName) );
    }
  }

  numericOnly(event): boolean { // restrict e,+,-,E characters in  input type number
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode === 48 || charCode === 49 || charCode === 50 || charCode === 51 || charCode === 52 || charCode === 53 || charCode === 54 || charCode === 55 || charCode === 56 || charCode === 57) {
      return true;
    }
    return false;

  }
}

