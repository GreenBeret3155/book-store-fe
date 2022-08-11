import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { ToasterService } from 'angular2-toaster';
import { User } from '../../@core/user/user.model';
import { UserService } from '../../@core/user/user.service';
import { ConfirmDialogComponent } from '../../share-lib-module/confirm-dialog/confirm-dialog.component';
import { onlyCharacterValidator } from '../../shared/directives/only-characters.directive';

@Component({
  selector: 'ngx-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {

  userInfo: FormGroup = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), onlyCharacterValidator(/^[a-zA-Z0-9_]{1,}$/)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
    firstName: ['', [Validators.required, Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.maxLength(50)]],
    phone: ['', [Validators.required, Validators.maxLength(11), Validators.pattern('^[0-9]*')]],
    email: [null, [Validators.minLength(5), Validators.maxLength(254), Validators.email]],
  }, {
    validators: this.MustMatch('password', 'confirmPassword')
  });

  constructor(private fb: FormBuilder,
    // public activatedRoute: ActivatedRoute,
    protected router: Router,
    private userService: UserService,
    private toastrService: NbToastrService,
    protected ref: NbDialogRef<RegisterDialogComponent>
  ) {
  }

  ngOnInit() {
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (control && matchingControl) {
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
        }
        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
        } else {
          matchingControl.setErrors(null);
        }
      }
    }
  }

  dismiss() {
    this.ref.close({ result: 'close' });
  }

  onSave() {
    this.userService.register(this.userInfo.getRawValue()).subscribe(() => this.onSaveSuccess(), error => this.onSaveError(error));
  }

  private onSaveSuccess() {
    this.ref.close({ result: 'complete' });
    this.toastrService.success('Thông báo', 'Đăng ký thành công');
  }

  private onSaveError(error) {
    this.toastrService.danger('Thông báo', error.error.title);
  }

}
