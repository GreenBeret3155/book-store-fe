import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../@core/login/login.service';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {NbThemeService} from '@nebular/theme';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

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
              private router: Router) { }
K
  ngOnInit() {
    this.themeService.changeTheme('default');
    this.userForm = this.fb.group({
      currentPassword: [null, Validators.required],
      recaptchaReactive: [null, this.showCaptcha ? [ Validators.required] : []],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
    }, {
      validators: this.passwordMustMatchChange('password', 'confirmPassword')
    });
  }
  changePass() {
    this.authService.changePass(this.userForm.value).subscribe(() => {
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

}
