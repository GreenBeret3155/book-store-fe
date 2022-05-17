import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {NotFoundComponent} from './miscellaneous/not-found/not-found.component';
import {DownloadPageComponent} from '../shared/components/download-page/download-page.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'user-management',
      loadChildren: () => import('./user-management/user-management.module')
        .then(m => m.UserManagementModule)
    },
    {
      path: 'chat-offline',
      loadChildren: () => import('./chat-offline/chat-offline.module')
        .then(m => m.ChatOfflineModule),
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
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
