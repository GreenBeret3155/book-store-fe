import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {NbThemeService} from '@nebular/theme';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'ngx-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss']
})
export class RequestPasswordComponent implements OnInit {
  userForm: FormGroup;
  requestPassError = false;
  requestPassSuccess = false;
  message: any;
  showCaptcha = environment.login_captcha;
  constructor(private router: Router,
              public themeService: NbThemeService,
              private authService: AuthService,
              private translate: TranslateService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.themeService.changeTheme('default');
    this.userForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      recaptchaReactive: [null, this.showCaptcha ? [ Validators.required] : []],
    });
  }
  requestPassword() {
    this.authService.requestResetPassword(this.userForm.value).subscribe(() => {
        this.message = this.translate.instant('requestPassword.requestPasswordSuccess');
        this.requestPassError = false;
        this.requestPassSuccess = true;
        this.userForm.reset();
      },
        error => {
          this.message = error.error.message;
          this.requestPassError = true;
          this.requestPassSuccess = false;
        })
  }
  backToLogin() {
    this.router.navigate(['auth/login']);
  }
  onClose() {
    this.requestPassError = false;
  }
  onCloseSuccess() {
    this.requestPassSuccess = false;
  }

}
