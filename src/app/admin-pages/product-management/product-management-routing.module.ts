import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductManagementComponent } from './product-management.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductUpdateComponent } from './product-update/product-update.component';


const routes: Routes = [
  {
    path: '',
    component: ProductManagementComponent,
    children: [
      {
        path: 'product',
        component: ProductSearchComponent,
      },
      {
        path: 'product-u',
        component: ProductUpdateComponent,
      },
      {
        path: '',
        redirectTo: 'product',
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductManagementRoutingModule { }
