import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../@core/login/login.service';
import {Router} from '@angular/router';
import {DeviceDetectorService} from 'ngx-device-detector';
import {NbDialogRef, NbThemeService} from '@nebular/theme';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {environment} from '../../../environments/environment';
import { UserModel } from '../../shared/model/user.model';

@Component({
  selector: 'ngx-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  loginForm: FormGroup;
  deviceInfo = null;
  authenticationError = false;
  showCaptcha = environment.login_captcha;
  isFocusingUsername: boolean = false;
  isFocusingPassword: boolean = false;

  constructor(private fb: FormBuilder, 
              private loginService: LoginService,
              public themeService: NbThemeService,
              private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService,
              private router: Router, 
              private deviceService: DeviceDetectorService,
              protected ref: NbDialogRef<LoginDialogComponent>) {
    this.deviceInfo = deviceService.getDeviceInfo();
    // console.log('this.deviceInfo', this.deviceInfo);
  }

  ngOnInit() {
    this.themeService.changeTheme('default');
    this.loginForm = this.fb.group({
      account: ['user1', Validators.required],
      password: ['hmhhmh', Validators.required],
      rememberMe: [true],
      recaptchaReactive: ['', this.showCaptcha ? [ Validators.required] : []],
    });
    if (this.showCaptcha) {
      this.loginForm.addControl('recaptchaReactive', new FormControl(null, [Validators.required]));
    }
    this.loginForm.valueChanges.subscribe(value => {
      this.authenticationError = false;
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      document.getElementById('account').focus();
    }, 100);
  }

  signIn() {
    this.loginService
      .login({
        username: this.loginForm.get('account')!.value,
        password: this.loginForm.get('password')!.value,
        tokenDevice: 'test_1',
        deviceName: 'device_test1',
        rememberMe: this.loginForm.get('rememberMe')!.value,
        recaptchaReactive: this.loginForm.get('recaptchaReactive')!.value
      })
      .subscribe(
        (result) => {
          this.authenticationError = false;
          this.dismiss(result);
        },
        (error) => {
          if (error) {
            this.authenticationError = true
          }
        }
      );
  }

  getDeviceInfo() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    // console.log(this.deviceInfo);
  }

  get isMobile() {
    return this.deviceService.isMobile();
  }

  get isTablet() {
    return this.deviceService.isTablet();
  }

  get isDesktop() {
    return this.deviceService.isDesktop();
  }

  applyDevice(userAgent = window.navigator.userAgent) {
    this.deviceService.setDeviceInfo(userAgent);
    this.getDeviceInfo();
  }

  resetDeviceInfo() {
    this.applyDevice();
  }

  onClose() {
    this.authenticationError = false;
  }
  forgotPassword() {
    this.router.navigate(['auth/request-password']);
  }

  dismiss(result: UserModel) {
    this.ref.close({result: 'close', userInfo: result});
  }

  onFocus(element: string): void{
    switch(element){
      case 'un':
        this.isFocusingUsername = true;
        break;
      case 'pw':
        this.isFocusingPassword = true;
        break;
    }
  }

  onBlur(element: string): void{
    switch(element){
      case 'un':
        if(this.loginForm.get('account').value && this.loginForm.get('account').value.trim()){
          return;
        }
        this.isFocusingUsername = false;
        break;
      case 'pw':
        if(this.loginForm.get('password').value && this.loginForm.get('password').value.trim()){
          return;
        }
        this.isFocusingPassword = false;
        break;
    }
  }
}
