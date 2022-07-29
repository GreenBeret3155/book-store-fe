import { HttpResponse } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule, Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { NotFoundComponent } from '../pages/miscellaneous/not-found/not-found.component';
import { DownloadPageComponent } from '../shared/components/download-page/download-page.component';
import { OrderService } from '../shared/services/main/order.service';
import { CartPageComponent } from './cart-page/cart-page.component';
import { MainPagesComponent } from './main-pages.component';
import { OrderDetailPageComponent } from './order-detail-page/order-detail-page.component';
import { OrderInfoPageComponent } from './order-info-page/order-info-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { PaymentResultPageComponent } from './payment-result-page/payment-result-page.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { ProductSearchPageComponent } from './product-search-page/product-search-page.component';


@Injectable({providedIn: 'root'})
export class OrderDetailResolve implements Resolve<any> {
  constructor(private service: OrderService, private router: Router) {
    // console.log(service, router);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.getOrderDetailById(id).pipe(
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
    this.router.navigate(['404']);
    return EMPTY;
  }
}

const routes: Routes = [{
  path: '',
  component: MainPagesComponent,
  children: [
    {
      path: 'chat-offline',
      loadChildren: () => import('../pages/chat-offline/chat-offline.module')
        .then(m => m.ChatOfflineModule),
    },
    {
      path: '',
      component: ProductSearchPageComponent,
    },
    { 
      path: 'products/:productId', 
      component: ProductDetailPageComponent 
    },
    {
      path: 'cart',
      component: CartPageComponent,
    },
    {
      path: 'order',
      component: OrderPageComponent,
    },
    {
      path: 'order-info',
      component: OrderInfoPageComponent,
    },
    {
      path: 'order-detail/:id',
      component: OrderDetailPageComponent,
      resolve: {
        objData: OrderDetailResolve
      },
    },
    {
      path: 'payment-result',
      component: PaymentResultPageComponent,
    },
    // {
    //   path: '',
    //   redirectTo: 'order-detail',
    //   pathMatch: 'full',
    // },
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
