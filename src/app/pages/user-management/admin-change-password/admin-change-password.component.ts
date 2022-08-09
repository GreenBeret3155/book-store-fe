import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {NbDialogRef, NbThemeService} from '@nebular/theme';
import { environment } from '../../../../environments/environment';
import { LoginService } from '../../../@core/login/login.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'ngx-admin-change-password',
  templateUrl: './admin-change-password.component.html',
  styleUrls: ['./admin-change-password.component.scss']
})
export class AdminChangePasswordComponent implements OnInit {
  @Input() name?: string;

  userForm: FormGroup;
  changePassFail = false;
  changePassSuccess = false;
  message: any;
  showCaptcha = environment.login_captcha;
  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private authService: AuthService,
              public themeService: NbThemeService,
              private translate: TranslateService,
              private router: Router,
              protected ref: NbDialogRef<AdminChangePasswordComponent>) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
    }, {
      validators: this.passwordMustMatchChange('password', 'confirmPassword')
    });
  }
  changePass() {
    let info = this.userForm.value;
    info.currentPassword = this.name;
    this.authService.adminChangePass(info).subscribe(() => {
        this.message = this.translate.instant('changePass.changePassSuccess');
        this.changePassFail = false;
        this.changePassSuccess = true;
        this.userForm.reset();
      } ,
      error => {
        this.message = error.error.message;
        this.changePassFail = true;
        this.changePassSuccess = false;
      })
  }
  onClose() {
    this.changePassFail = false;
  }
  onCloseSuccess() {
    this.changePassSuccess = false;
  }

  passwordMustMatchChange(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (control && matchingControl) {
        if (matchingControl.errors && !matchingControl.errors.passwordMustMatchChange) {
          // return if another validator has already found an error on the matchingControl
          return;
        }
        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
          matchingControl.setErrors({passwordMustMatchChange: true});
        } else {
          matchingControl.setErrors(null);
        }
      }
    }
  }

  dismiss() {
    this.ref.close({result: 'close'});
  }

}
