import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPagesComponent } from './main-pages.component';


const routes: Routes = [{
  path: '',
  component: MainPagesComponent,
  children: [
    {
      path: '',
      redirectTo: 'user-management',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPagesRoutingModule { }
