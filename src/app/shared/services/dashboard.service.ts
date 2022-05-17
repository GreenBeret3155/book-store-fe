import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {IDashboardConfig} from '../model/dashboardConfig.model';
import {createRequestOption} from '../util/request-util';
import {environment} from '../../../environments/environment';

type EntityResponseType = HttpResponse<IDashboardConfig>;
type EntityArrayResponseType = HttpResponse<IDashboardConfig[]>;

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  currentScreen: Subject<any> = new BehaviorSubject(null);
  currentProfile: Subject<any> = new BehaviorSubject(null);
  currentTheme: Subject<any> = new BehaviorSubject(null);
  openSearchBar = new Subject();

  constructor(protected http: HttpClient) {
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDashboardConfig[]>(`${environment.apiUrl}/config-screens`, {
      params: options,
      observe: 'response'
    });
  }

  findByKey(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.post<any[]>(`${environment.apiUrl}/config-screens/find-keyword`, null, {
      params: options,
      observe: 'response'
    });
    // return this.http.post<IDashboardConfig>(`${environment.apiUrl}/config-screens`, req, {observe: 'response'});
  }
  findScreenDetailChild(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(`${environment.apiUrl}/config-screens/find-screen-detail-child`, {
      params: options,
      observe: 'response'
    });
  }

  queryProfileSlideShow(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDashboardConfig[]>(`${environment.apiUrl}/config-screens/get-slide-screen/`, {
      params: options,
      observe: 'response'
    });
  }

  getListTabs(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDashboardConfig[]>(`${environment.apiUrl}/config-screens/find-screen-root`, {
      params: options,
      observe: 'response'
    });
  }

  getListTabsByParent(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDashboardConfig[]>(`${environment.apiUrl}/config-screens/find-screen-by-profile-and-parent`, {
      params: options,
      observe: 'response'
    });
  }

  getTabsForScreen(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDashboardConfig[]>(`${environment.apiUrl}/config-screens/find-tabs-for-screen`, {
      params: options,
      observe: 'response'
    });
  }

  findScreenHome(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDashboardConfig[]>(`${environment.apiUrl}/config-screens/find-screen-home`, {
      params: options,
      observe: 'response'
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDashboardConfig>(`${environment.apiUrl}/config-screens/${id}`, {observe: 'response'});
  }

  create(book: IDashboardConfig): Observable<EntityResponseType> {
    return this.http.post<IDashboardConfig>(`${environment.apiUrl}/config-screens`, book, {observe: 'response'});
  }

  update(book: IDashboardConfig): Observable<EntityResponseType> {
    return this.http.put<IDashboardConfig>(`${environment.apiUrl}/config-screens`, book, {observe: 'response'});
  }

  getDashboard(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/config-screens`, {observe: 'response'})
  }

  getGroupChart(scrId) {
    const options = createRequestOption({screenIds: scrId});
    return this.http.get<any>(`${environment.apiUrl}/cat-group-charts`, {params: options});
  }

  clone(id: any) {
    return this.http.post<any>(`${environment.apiUrl}/config-screens/copy/${id}`, {observe: 'response'});
  }

  delete(id: any) {
    return this.http.delete(`${environment.apiUrl}/config-screens/${id}`);
  }

  deleteAll(ids: any[]) {
    return this.http.post(`${environment.apiUrl}/config-screens/delete-all`, ids);
  }

  deleteMappingLinkByMapChartId(chartMapId: any) {
    return this.http.delete(`${environment.apiUrl}/config-map-chart-links/delete-by-chart-map/{chartMapId}`);
  }

  queryGroupScreen(scrId, groupChartId) {
    const options = createRequestOption({groupChartId: groupChartId});
    return this.http.get<any>(`${environment.apiUrl}/config-screens/${scrId}`, {params: options});

  }

}
