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
export class OrderInfoService {
  constructor(private http: HttpClient,
    private store: Store<AppState>,) {
  }

  // public refreshCart(isNoUserRefresh?: boolean){
  //   if (isNoUserRefresh){
  //     this.store.dispatch(new InitProduct([]))
  //     return ;
  //   }
    
  //   this.getAllCartItems().subscribe(res => {
  //     const listCartItems : ProductModel[] = res.body;
  //     this.store.dispatch(new InitProduct(listCartItems))
  //   }, () => {
  //     this.store.dispatch(new InitProduct([]))
  //   })
  // }
  public sortDefaultOrderInfos(input : OrderInfoModel[]):void{
    input.sort((a,b) => b.state - a.state);
  }

  public saveCart(data, req?) {
    const options = createRequestOption(req);
    return this.http.post<any>(`${environment.apiUrl}/cart`, data, {
      params: options,
      observe: 'response'
    });
  }

  public getAllOrderInfos(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/order-info`, {
      observe: 'response'
    });
  }

  public createOrderInfo(data:OrderInfoModel): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/create-order-info`,data, {
      observe: 'response'
    });
  }

  public makeDefaultOrderInfo(id:number): Observable<any> {
    const data = {'id': id}
    return this.http.post<any>(`${environment.apiUrl}/default-order-info`,data, {
      observe: 'response'
    });
  }

  public deleteOrderInfo(id:number): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/order-info-delete/${id}`, {
      observe: 'response'
    });
  }

  public clearCart(): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/cart/clear`, {
      observe: 'response'
    });
  }

  public delete(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/action/delete`, data, {
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
