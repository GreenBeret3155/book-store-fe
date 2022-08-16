import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorManagementComponent } from './author-management.component';
import { AuthorSearchComponent } from './author-search/author-search.component';


const routes: Routes = [
  {
    path: '',
    component: AuthorManagementComponent,
    children: [
      {
        path: 'author',
        component: AuthorSearchComponent,
      },
      {
        path: '',
        redirectTo: 'author',
        pathMatch: 'full',
      },
      // {
      //   path: 'edit/:id',
      //   component: ProductUpdateComponent,
      //   resolve: {
      //     objData: ProductManagementResolve
      //   },
      // },
      // {
      //   path: 'new',
      //   component: ProductUpdateComponent,
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorManagementRoutingModule { }
