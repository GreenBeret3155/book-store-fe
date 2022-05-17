import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {IDashboardConfig} from '../model/dashboardConfig.model';
import {createRequestOption} from '../util/request-util';
import {environment} from '../../../environments/environment';
import {IConfigMenu} from '../model/config-menu.model';

type EntityResponseType = HttpResponse<IDashboardConfig>;
type EntityArrayResponseType = HttpResponse<IDashboardConfig[]>;
type EntityMenuResponseType = HttpResponse<IConfigMenu>;

@Injectable({
  providedIn: 'root'
})
export class ConfigMenuService {

  currentMenuItemId = new BehaviorSubject(null);
  currentMenuItems;

  constructor(protected http: HttpClient) {
  }

  query(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<IDashboardConfig[]>(`${environment.apiUrl}/config-menus`, {
      params: options,
      observe: 'response'
    });
  }

  findAll(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<IConfigMenu>(`${environment.apiUrl}/config-menus`, {
      params: options,
      observe: 'response'
    });
  }

  find(id: number, req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any>(`${environment.apiUrl}/config-menus/${id}`, {
      params: options,
      observe: 'response'
    });
  }

  //
  // create(book: IDashboardConfig): Observable<EntityResponseType> {
  //   return this.http.post<IDashboardConfig>(`${environment.apiUrl}/config-screens`, book, {observe: 'response'});
  // }
  //
  // update(book: IDashboardConfig): Observable<EntityResponseType> {
  //   return this.http.put<IDashboardConfig>(`${environment.apiUrl}/config-screens`, book, {observe: 'response'});
  // }
  getMenuByProfileId(id: any) {
    // /api/config-menus/get-by-profile?profileId=4
    return this.http.get<any>(`${environment.apiUrl}/config-menus/get-by-profile?profileId=${id}`);
  }

  delete(id: any) {
    return this.http.delete(`${environment.apiUrl}/config-menus/${id}`);
  }

  create(objModel: IConfigMenu): Observable<EntityMenuResponseType> {
    return this.http.post<IConfigMenu>(`${environment.apiUrl}/config-menus`, objModel, {observe: 'response'});
  }

  update(objModel: IConfigMenu): Observable<EntityMenuResponseType> {
    return this.http.put<IConfigMenu>(`${environment.apiUrl}/config-menus`, objModel, {observe: 'response'});
  }

  deleteMultiple(objModel: any): Observable<EntityResponseType> {
    return this.http.post<any>(`${environment.apiUrl}/config-menus/delete-multiple`, objModel, {observe: 'response'});
  }
}
