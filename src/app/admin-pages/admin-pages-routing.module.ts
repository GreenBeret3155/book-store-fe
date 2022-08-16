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
      path: 'product-management',
      loadChildren: () => import('../admin-pages/product-management/product-management.module')
        .then(m => m.ProductManagementModule)
    },
    {
      path: 'order-management',
      loadChildren: () => import('../admin-pages/order-management/order-management.module')
        .then(m => m.OrderManagementModule)
    },
    {
      path: 'author-management',
      loadChildren: () => import('../admin-pages/author-management/author-management.module')
        .then(m => m.AuthorManagementModule)
    },
    {
      path: 'category-management',
      loadChildren: () => import('../admin-pages/category-management/category-management.module')
        .then(m => m.CategoryManagementModule)
    },
    {
      path: 'admin-chat',
      loadChildren: () => import('./admin-chat/admin-chat.module')
        .then(m => m.AdminChatModule),
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
