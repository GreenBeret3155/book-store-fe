import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import { createRequestOption } from '../../util/request-util';
import { tap } from 'rxjs/operators';
import { ProductModel } from '../../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class AdminOrderService {
  constructor(private http: HttpClient) {
  }

  public query(data?:any, req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.post<any>(`${environment.apiUrl}/order-detail/query`,data, {
      params: options,
      observe: 'response'
    });
  }

  public getOrderById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/order-detail/${id}`, {
      observe: 'response'
    });
  }

  public saveProduct(item: ProductModel): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/save-product`, item, {
      observe: 'response'
    });
  }

  // public changePass(body?: any): Observable<any> {
  //   return this.http.post<any>(`${environment.apiUrl}/users/changePass`, body);
  // }
  // public requestResetPassword(body?: any): Observable<any> {
  //   return this.http.post<any>(`${environment.apiUrl}/account/reset-password/init`, body);
  // }
  // public requestResetPasswordComplete(body?: any): Observable<any> {
  //   return this.http.post<any>(`${environment.apiUrl}/account/reset-password/finish`, body);
  // }
}
