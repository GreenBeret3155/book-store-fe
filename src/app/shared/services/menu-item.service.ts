import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IDashboardConfig} from '../model/dashboardConfig.model';
import {createRequestOption} from '..//util/request-util';
import {environment} from '../../../environments/environment';

type EntityResponseType = HttpResponse<IDashboardConfig>;
type EntityArrayResponseType = HttpResponse<IDashboardConfig[]>;

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {

  constructor(protected http: HttpClient) {
  }

  query(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<IDashboardConfig[]>(`${environment.apiUrl}/config-menu-items`, {
      params: options,
      observe: 'response'
    });
  }

  // find(id: number): Observable<EntityResponseType> {
  //   return this.http.get<IDashboardConfig>(`${environment.apiUrl}/config-screens/${id}`, {observe: 'response'});
  // }
  //
  // create(book: IDashboardConfig): Observable<EntityResponseType> {
  //   return this.http.post<IDashboardConfig>(`${environment.apiUrl}/config-screens`, book, {observe: 'response'});
  // }
  //
  // update(book: IDashboardConfig): Observable<EntityResponseType> {
  //   return this.http.put<IDashboardConfig>(`${environment.apiUrl}/config-screens`, book, {observe: 'response'});
  // }
}
