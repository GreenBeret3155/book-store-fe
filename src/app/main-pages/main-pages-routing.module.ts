import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '../pages/miscellaneous/not-found/not-found.component';
import { DownloadPageComponent } from '../shared/components/download-page/download-page.component';
import { MainPagesComponent } from './main-pages.component';


const routes: Routes = [{
  path: '',
  component: MainPagesComponent,
  children: [
    {
      path: 'user-management',
      loadChildren: () => import('../pages/user-management/user-management.module')
        .then(m => m.UserManagementModule)
    },
    {
      path: 'chat-offline',
      loadChildren: () => import('../chat-custom/chat-custom.module')
        .then(m => m.ChatCustomModule),
      data: {
        breadcrumb: {
          label: 'Chat offline',
        },
      }
    },
    {
      path: 'download-file/:link',
      component: DownloadPageComponent,
    },
    {
      path: '',
      redirectTo: 'user-management',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPagesRoutingModule { }
