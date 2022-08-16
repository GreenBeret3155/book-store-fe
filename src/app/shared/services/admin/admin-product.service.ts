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
export class AdminProductService {
  constructor(private http: HttpClient) {
  }

  public saveImage(formData: FormData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/upload`, formData, {
      observe: 'response'
    });
  }

  public getAllAuthors(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any>(`${environment.apiUrl}/authors`, {
      params: options,
      observe: 'response'
    });
  }

  public getAllCategories(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any>(`${environment.apiUrl}/categories`, {
      params: options,
      observe: 'response'
    });
  }

  public query(req?: any): Observable<any> {
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

  public saveProduct(item: ProductModel): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/save-product`, item, {
      observe: 'response'
    });
  }

  public getAmountByPId(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/product-amounts/${id}`, {
      observe: 'response'
    });
  }

  public changeAmountProduct(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/change-amount`, data, {
      observe: 'response'
    });
  }

  public queryAuthors(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any>(`${environment.apiUrl}/get-authors`, {
      params: options,
      observe: 'response'
    });
  }

  public saveAuthor(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/authors`, data, {
      observe: 'response'
    });
  }

  public queryCategories(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any>(`${environment.apiUrl}/get-categories`, {
      params: options,
      observe: 'response'
    });
  }

  public saveCategory(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/categories`, data, {
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
