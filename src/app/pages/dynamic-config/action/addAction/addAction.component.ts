import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {
  getFormValidationErrors, trimRequired,
} from '../../../validator';
import {ActionService} from '../../../../shared/services/action.service';
import {TranslateService} from '@ngx-translate/core';
import {ToasterService, ToasterConfig} from 'angular2-toaster';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-add-action',
  templateUrl: 'addAction.component.html',
  styleUrls: ['addAction.component.scss'],
})
export class AddActionComponent implements OnInit, AfterViewInit {
  title: string;
  inputAction: FormGroup;
  data: any;
  loading = false;
  source: {
    id: null,
    code: null,
    name: null,
    status: null,
    description: null,
  };

  lstStatus: any[] = [
    {label: 'Hoạt động', value: 1},
    {label: 'Không hoạt động', value: 0}
  ];
  toasterConfig: ToasterConfig = new ToasterConfig({
    animation: 'flyRight',
    newestOnTop: true
  });


  constructor(protected ref: NbDialogRef<AddActionComponent>,
              private actionService: ActionService,
              private toastr: NbToastrService,
              private toastrService: ToasterService,
              private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.ngAfterViewInit();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      document.getElementById('action-code-add-windows').focus();
    }, 100);
  }

  getError(control: string) {
    const key = Object.keys(this.inputAction.get(control).errors).shift();
    return this.getValueActionError(control, key);
  }

  initForm() {
    if(this.data){
      this.inputAction = new FormGroup({
        id: new FormControl(this.data.id, []),
        code: new FormControl(this.data.code, [trimRequired, Validators.maxLength(200)]),
        name: new FormControl(this.data.name, [trimRequired, Validators.maxLength(300)]),
        status: new FormControl(this.data.status === 1, [Validators.required]),
        description: new FormControl(this.data.description, [Validators.maxLength(500)]),
      }, {});
    }else{
      this.inputAction = new FormGroup({
        id: new FormControl(undefined, []),
        code: new FormControl(undefined, [trimRequired, Validators.maxLength(200)]),
        name: new FormControl(undefined, [trimRequired, Validators.maxLength(300)]),
        status: new FormControl(true, [Validators.required]),
        description: new FormControl(undefined, [Validators.maxLength(500)]),
      }, {});
    }
    
  }

  cancel() {
    this.ref.close();
  }

  getValueActionError(control, key) {
    return this.translate.instant('action.errorForm.' + control + '.' + key);
  }

  submit() {
    this.inputAction.markAllAsTouched();
    if (this.inputAction.valid) {
      const actionItem = Object.assign({}, this.inputAction.value);
      if (this.inputAction.get('status').value) {
        actionItem.status = 1;
      } else {
        actionItem.status = 0;
      }
      this.loading = true;
      if (this.data == null) {
        this.actionService.insert(actionItem).subscribe(
          (value) => this.ref.close(value),
          (error) => {
            this.toastrService.pop('error', this.translate.instant('common.notify.notification'), error.error.title );
            this.loading = false;
          },
          () => this.loading = false
        );
      } else {
        this.actionService.update(actionItem).subscribe(
          (value) => this.ref.close(value),
          (error) => {
            this.toastrService.pop('error', this.translate.instant('common.notify.notification'), error.error.title );
            this.loading = false;
          },
          () => this.loading = false,
        );
      }
    } else {
      const error = getFormValidationErrors(this.inputAction.controls).shift();
      this.toastrService.pop('error', this.translate.instant('common.notify.notification'), this.getValueActionError(error.controlName, error.errorName) );
    }
  }
}

