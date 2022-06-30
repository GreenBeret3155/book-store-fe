import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '../pages/miscellaneous/not-found/not-found.component';
import { DownloadPageComponent } from '../shared/components/download-page/download-page.component';
import { AdminPagesComponent } from './admin-pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [{
  path: '',
  component: AdminPagesComponent,
  children: [
    {
      path: '',
      component: DashboardComponent,
    },
    {
      path: 'user-management',
      loadChildren: () => import('../pages/user-management/user-management.module')
        .then(m => m.UserManagementModule)
    },
    {
      path: 'chat-offline',
      loadChildren: () => import('../pages/chat-offline/chat-offline.module')
        .then(m => m.ChatOfflineModule),
    },
    {
      path: 'download-file/:link',
      component: DownloadPageComponent,
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
export class AdminRoutingModule { }
