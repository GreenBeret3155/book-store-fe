import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuardService} from './@core/mock/auth-guard.service';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import {LoginComponent} from './auth-routing/login/login.component';
import {UserRouteAccessService} from './@core/auth/user-route-access-service';
import {LogoutComponent} from './auth-routing/logout/logout.component';
import {ChangePasswordComponent} from './auth-routing/change-password/change-password.component';
import {RequestPasswordComponent} from './auth-routing/request-password/request-password.component';
import {RequestPasswordCompleteComponent} from './auth-routing/request-password-complete/request-password-complete.component';
import {AuthGuardAuthsService} from './@core/mock/auth-guard-auths.service';

const routes: Routes = [
  // {
  //   canActivate: [AuthGuardService],
  //   path: 'pages',
  //   data: {
  //     // authorities: ['ROLE_ADMIN', 'ROLE_USER'],
  //     breadcrumb: {label: 'Trang chủ'}
  //   },
  //     // canActivate: [UserRouteAccessService],
  //   loadChildren: () => import('../app/pages/pages.module')
  //     .then(m => m.PagesModule),
  // },
  {
    canActivate: [],
    path: 'admin-pages',
    data: {
      // authorities: ['ROLE_ADMIN', 'ROLE_USER'],
      breadcrumb: {label: 'Trang chủ'}
    },
      // canActivate: [UserRouteAccessService],
    loadChildren: () => import('./admin-pages/admin-pages.module')
      .then(m => m.AdminPagesModule),
  },
  {
    canActivate: [],
    path: 'pages',
    data: {
      // authorities: ['ROLE_ADMIN', 'ROLE_USER'],
      breadcrumb: {label: 'Trang chủ'}
    },
      // canActivate: [UserRouteAccessService],
    loadChildren: () => import('../app/pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    canActivate: [AuthGuardAuthsService],
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: LogoutComponent,
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
      // {
      //   path: 'request-password',
      //   component: NbRequestPasswordComponent,
      // },
      {
        path: 'request-password',
        component: RequestPasswordComponent,
      },
      {
        path: 'request-password-complete/:token',
        component: RequestPasswordCompleteComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  {path: '', redirectTo: 'admin-pages', pathMatch: 'full'},
  {path: '**', redirectTo: 'admin-pages'},
];

const config: ExtraOptions = {
  useHash: false,
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64]
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],

})
export class AppRoutingModule {
}
