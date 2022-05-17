import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createRequestOption} from '../util/request-util';
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {IConfigMenuItem} from '../model/config-menu-item.model';

type EntityResponseType = HttpResponse<IConfigMenuItem>;

@Injectable({
  providedIn: 'root'
})
export class ConfigMenuItemService {
  constructor(protected http: HttpClient) {

  }

  public query(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<IConfigMenuItem[]>(`${environment.apiUrl}/config-menu-items/all-info`, {
      params: options,
      observe: 'response'
    });
  }

  create(objModel: IConfigMenuItem): Observable<EntityResponseType> {
    return this.http.post<IConfigMenuItem>(`${environment.apiUrl}/config-menu-items`, objModel, {observe: 'response'});
  }

  update(objModel: IConfigMenuItem): Observable<EntityResponseType> {
    return this.http.put<IConfigMenuItem>(`${environment.apiUrl}/config-menu-items`, objModel, {observe: 'response'});
  }

  delete(id: any) {
    return this.http.delete(`${environment.apiUrl}/config-menu-items/${id}`);
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<any>(`${environment.apiUrl}/config-menu-items/allInfo/${id}`, {observe: 'response'});
  }

  deleteMultiple(objModel: any): Observable<EntityResponseType> {
    return this.http.post<any>(`${environment.apiUrl}/config-menu-items/delete-multiple`, objModel, {observe: 'response'});
  }
}
