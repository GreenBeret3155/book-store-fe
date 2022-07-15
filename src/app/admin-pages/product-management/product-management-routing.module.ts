import { HttpResponse } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule, Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { IProductModel, ProductModel } from '../../shared/model/product.model';
import { AdminProductService } from '../../shared/services/admin/admin-product.service';
import { ProductManagementComponent } from './product-management.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductUpdateComponent } from './product-update/product-update.component';

@Injectable({providedIn: 'root'})
export class ProductManagementResolve implements Resolve<IProductModel> {
  constructor(private service: AdminProductService, private router: Router) {
    // console.log(service, router);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IProductModel> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.getProductById(id).pipe(
        flatMap((res: HttpResponse<IProductModel>) => {
          if (res.body) {
            console.log('res.body', res.body);
            return of(res.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProductModel());
  }
}

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
        path: '',
        redirectTo: 'product',
        pathMatch: 'full',
      },
      {
        path: 'edit/:id',
        component: ProductUpdateComponent,
        resolve: {
          objData: ProductManagementResolve
        },
      },
      {
        path: 'new',
        component: ProductUpdateComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductManagementRoutingModule { }
