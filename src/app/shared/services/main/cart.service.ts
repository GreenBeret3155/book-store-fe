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
export class CartService {
  constructor(private http: HttpClient,
    private store: Store<AppState>,) {
  }

  public refreshCart(isNoUserRefresh?: boolean){
    if (isNoUserRefresh){
      this.store.dispatch(new InitProduct([]))
      return ;
    }
    
    this.getAllCartItems().subscribe(res => {
      const listCartItems : ProductModel[] = res.body;
      this.store.dispatch(new InitProduct(listCartItems))
    }, () => {
      this.store.dispatch(new InitProduct([]))
    })
  }

  public saveCart(data, req?) {
    const options = createRequestOption(req);
    return this.http.post<any>(`${environment.apiUrl}/cart`, data, {
      params: options,
      observe: 'response'
    });
  }

  public getAllCartItems(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/cart`, {
      observe: 'response'
    });
  }

  public clearCart(): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/cart/clear`, {
      observe: 'response'
    });
  }

  public transformProductsToOrder(input: any[]): any[] {
    return input.filter( e => e.isSelected).map(e => {
      if(e.author){
        e.authorName = e.author.name;
      }
      if(e.quantity != null && e.price){
        e.totalPrice = e.quantity*e.price;
      }else{
        e.totalPrice = 0;
      }
      if(!e.productId){
        e.productId = e.id;
      }
      e.isSelected = e.isSelected ? 1 : 0;
      return e;
    })
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
