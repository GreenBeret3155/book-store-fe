import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {createRequestOption} from "../../util/request-util";
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { ProductModel } from '../../model/product.model';
import { InitProduct } from '../../../@core/actions/product.actions';
import { OrderInfoModel } from '../../model/order-info.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient,
    private store: Store<AppState>,) {
  }

  public saveOrder(data) {
    return this.http.post<any>(`${environment.apiUrl}/order`, data, {
      observe: 'response'
    });
  }

  public getAllOrders(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/orders-detail`, {
      observe: 'response'
    });
  }

  public getOrderDetailById(orderId: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/order-detail/${orderId}`, {
      observe: 'response'
    });
  }

  public checkTransaction(data:any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/check-transaction`, data, {
      observe: 'response'
    });
  }

  public changeOrderState(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/order-detail/state`, data, {
      observe: 'response'
    });
  }

  public getAllAction(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/sys-actions-getAll`, {
      observe: 'response'
    });
  }
  public getActionTableMap(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/sys-actions/getAll`, data, {
      observe: 'response'
    });
  }
  
  multiDelete(objModel: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/action/multiple-delete`, objModel, {observe: 'response'});
  }
}
