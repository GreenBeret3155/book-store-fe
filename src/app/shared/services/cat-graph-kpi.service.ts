import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {createRequestOption} from '../util/request-util';
import {ICatGroupsChart} from '../model/cat-groups-chart';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ICatGraphKpi} from '../model/cat-graph-kpi.model';

type EntityResponseType = HttpResponse<ICatGroupsChart>;

@Injectable({
  providedIn: 'root'
})
export class CatGraphKpiService {

  constructor(protected http: HttpClient) {

  }

  public query(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<ICatGraphKpi[]>(`${environment.apiUrl}/cat-graph-kpis`, {
      params: options,
      observe: 'response'
    });
  }

  public search(data: any, req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.post(`${environment.apiUrl}/cat-graph-kpis-search`, data, {
      params: options,
      observe: 'response'
    });
  }
  public onExport(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/cat-graph-kpis-export`, data, {
      observe: 'response',
      responseType: 'arraybuffer'
    });
  }

  public export(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.post(`${environment.apiUrl}/cat-graph-kpis/export`, null, {
      params: options,
      observe: 'response',
      responseType: 'arraybuffer'
    });
  }

  public getKpisMain(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<ICatGraphKpi[]>(`${environment.apiUrl}/cat-graph-kpis-main`, {
      params: options,
      observe: 'response'
    });
  }

  public getKpisMaps(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<ICatGraphKpi[]>(`${environment.apiUrl}/cat-graph-kpis/list-kpi-maps`, {
      params: options,
      observe: 'response'
    });
  }

  create(objModel: ICatGroupsChart): Observable<EntityResponseType> {
    return this.http.post<ICatGroupsChart>(`${environment.apiUrl}/cat-graph-kpis`, objModel, {observe: 'response'});
  }

  update(objModel: ICatGroupsChart): Observable<EntityResponseType> {
    return this.http.put<ICatGroupsChart>(`${environment.apiUrl}/cat-graph-kpis`, objModel, {observe: 'response'});
  }

  delete(id: any) {
    return this.http.delete(`${environment.apiUrl}/cat-graph-kpis/${id}`);
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<any>(`${environment.apiUrl}/cat-graph-kpis/${id}`, {observe: 'response'});
  }
  getMaxKpiId(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/cat-graph-kpis/get-max-kpi-id`, {observe: 'response'});
  }
  findSynonymById(id: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/cat-kpi-synonyms-kpi-id/${id}`, {observe: 'response'});
  }

  getGraphKpiByDomain(domainCode: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/cat-graph-kpis-domain-code/${domainCode}`, {observe: 'response'});
  }

  public searchTag(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(`${environment.apiUrl}/cat-graph-kpis-hashtag`, {
      params: options,
      observe: 'response'
    });
  }

  deleteMultiple(objModel: any): Observable<EntityResponseType> {
    return this.http.post<any>(`${environment.apiUrl}/cat-graph-kpis/delete-multiple`, objModel, {observe: 'response'});
  }
}
