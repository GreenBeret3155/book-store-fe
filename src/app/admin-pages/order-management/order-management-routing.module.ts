import { HttpResponse } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule, Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { ProductModel } from '../../shared/model/product.model';
import { AdminOrderService } from '../../shared/services/admin/admin-order.service';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderManagementComponent } from './order-management.component';
import { OrderSearchComponent } from './order-search/order-search.component';


@Injectable({providedIn: 'root'})
export class OrderManagementResolve implements Resolve<any> {
  constructor(private service: AdminOrderService, private router: Router) {
    // console.log(service, router);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.getOrderById(id).pipe(
        flatMap((res: HttpResponse<any>) => {
          if (res.body) {
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
    component: OrderManagementComponent,
    children: [
      {
        path: 'order',
        component: OrderSearchComponent,
      },
      {
        path: '',
        redirectTo: 'order',
        pathMatch: 'full',
      },
      {
        path: 'detail/:id',
        component: OrderDetailComponent,
        resolve: {
          objData: OrderManagementResolve
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderManagementRoutingModule { }
