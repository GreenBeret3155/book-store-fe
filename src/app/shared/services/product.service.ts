import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import { createRequestOption } from '../util/request-util';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {
  }

  public getAllProducts(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any>(`${environment.apiUrl}/get-products`, {
      params: options,
      observe: 'response'
    });
  }

  public getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/get-products/${id}`, {
      observe: 'response'
    });
  }

  public getAllCategories(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/categories/leaf`, {
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
