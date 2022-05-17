import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../util/request-util';
import {tap} from 'rxjs/operators';

// import {IDashboardConfig} from '../model/dashboardConfig.model';

// type EntityResponseType = HttpResponse<IDashboardConfig>;
// type EntityArrayResponseType = HttpResponse<IDashboardConfig[]>;

@Injectable({
  providedIn: 'root'
})
export class ConfigChartService {

  chartResulCache$: any = [];

  constructor(protected http: HttpClient) {
  }

  // query(req?: any): Observable<EntityArrayResponseType> {
  //   const options = createRequestOption(req);
  //   return this.http.get<IDashboardConfig[]>(`${environment.apiUrl}/config-screens`, {
  //     params: options,
  //     observe: 'response'
  //   });
  // }
  //
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
  getChartResult(chartId, req?): Observable<any> {
    const options = createRequestOption(req);
    const existChart = this.chartResulCache$.find(e => e.body.id === chartId &&
      JSON.stringify(e.req) === JSON.stringify(req));
    if (existChart) {
      return of(Object.assign({}, existChart));
    }
    return this.http.get<any>(`${environment.apiUrl}/get-chart-result/${chartId}`, {
      observe: 'response',
      params: options
    }).pipe(tap(res => {
      res.req = req;
      // this.chartResulCache$.push(res);
    }));
  }

  public searchChart(req?: any): Observable<any> {
    const options = createRequestOption(req);
    console.log('khoi tao tra cuu');
    return this.http.post<any[]>(`${environment.apiUrl}/config-charts/search-chart`, null, {
      params: options,
      observe: 'response'
    });
  }
}
