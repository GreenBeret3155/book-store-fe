/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LOCALE_ID, NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CoreModule} from './@core/core.module';
import {ThemeModule} from './@theme/theme.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import {LoginComponent} from './auth-routing/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import vi from '@angular/common/locales/vi';
import viEt from '@angular/common/locales/extra/vi';
import {DecimalPipe, registerLocaleData} from '@angular/common';
import {LogoutComponent} from './auth-routing/logout/logout.component';
import {SharedModule} from './shared/shared.module';
import {NgxTrimDirectiveModule} from 'ngx-trim-directive';
import {NbMenuModule} from './menu-custom/menu.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
// import { MatFabMenuModule } from '@angular-material-extensions/fab-menu';
import {ToasterModule} from 'angular2-toaster';
import {WarningDialogComponent} from './shared/components/warning-dialog/warning-dialog.component';
import {UserForwardComponent} from './shared/components/user-forward/user-forward.component';
import {ChangePasswordComponent} from './auth-routing/change-password/change-password.component';
import {RequestPasswordComponent} from './auth-routing/request-password/request-password.component';
import {RequestPasswordCompleteComponent} from './auth-routing/request-password-complete/request-password-complete.component';
import {UploadDialogComponent} from './shared/components/upload-dialog/upload-dialog.component';
import {HotkeyModule} from 'angular2-hotkeys';
import {ImageViewComponent} from './shared/components/image-view/image-view.component';
import {ViewChartFavoriteComponent} from './shared/components/view-chart-favorite/view-chart-favorite.component';
import {RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings} from "ng-recaptcha";
import {environment} from "../environments/environment";
import { ChatDialogComponent } from './main-pages/components/chat-dialog/chat-dialog.component';
import { MainPagesModule } from './main-pages/main-pages.module';
import { LoginDialogComponent } from './auth-routing/login-dialog/login-dialog.component';


registerLocaleData(vi, 'vi-VI', viEt);

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, LoginComponent, LogoutComponent, ChangePasswordComponent, RequestPasswordComponent, RequestPasswordCompleteComponent, LoginDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbCardModule,
    NbIconModule,
    HotkeyModule.forRoot(),
    ThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    ToasterModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    DeviceDetectorModule.forRoot(),
    ReactiveFormsModule,
    NbInputModule,
    NbButtonModule,
    SharedModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    ReactiveFormsModule,
    NbAlertModule,
    NgxTrimDirectiveModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      defaultLanguage: 'vi'
    })
  ],
  entryComponents: [WarningDialogComponent, UserForwardComponent, UploadDialogComponent, ImageViewComponent, ViewChartFavoriteComponent, LoginDialogComponent],
  bootstrap: [AppComponent],
  providers: [{provide: LOCALE_ID, useValue: 'vi-VI'}, DecimalPipe,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: `${environment.captcha_siteKey}`,
      } as RecaptchaSettings,
    }]
})
export class AppModule {
}
