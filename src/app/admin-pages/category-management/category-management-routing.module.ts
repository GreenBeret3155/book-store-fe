import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryManagementComponent } from './category-management.component';
import { CategorySearchComponent } from './category-search/category-search.component';


const routes: Routes = [
  {
    path: '',
    component: CategoryManagementComponent,
    children: [
      {
        path: 'category',
        component: CategorySearchComponent,
      },
      {
        path: '',
        redirectTo: 'category',
        pathMatch: 'full',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryManagementRoutingModule { }
