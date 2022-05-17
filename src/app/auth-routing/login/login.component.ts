import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../@core/login/login.service';
import {Router} from '@angular/router';
import {DeviceDetectorService} from 'ngx-device-detector';
import {NbThemeService} from '@nebular/theme';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup;
  deviceInfo = null;
  authenticationError = false;
  showCaptcha = environment.login_captcha;

  constructor(private fb: FormBuilder, private loginService: LoginService,
              public themeService: NbThemeService,
              private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService,
              private router: Router, private deviceService: DeviceDetectorService) {
    this.deviceInfo = deviceService.getDeviceInfo();
    // console.log('this.deviceInfo', this.deviceInfo);
  }

  ngOnInit() {
    this.themeService.changeTheme('default');
    this.loginForm = this.fb.group({
      account: [null, Validators.required],
      password: [null, Validators.required],
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
        () => {
          this.authenticationError = false;
          const pathDefault = this.$localStorage.retrieve('pathDefault') || this.$sessionStorage.retrieve('pathDefault') || '';
          this.router.navigate([pathDefault]);
          // if (
          //   this.router.url === '/account/register' ||
          //   this.router.url.startsWith('/account/activate') ||
          //   this.router.url.startsWith('/account/reset/')
          // ) {
          //   this.router.navigate(['']);
          // }
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
}
