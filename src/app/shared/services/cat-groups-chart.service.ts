import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createRequestOption} from '../util/request-util';
import {environment} from '../../../environments/environment';
import {ICatGroupsChart} from '../model/cat-groups-chart';
import {ICatItem} from '../../@core/model/cat-item.model';

type EntityResponseType = HttpResponse<ICatGroupsChart>;

@Injectable({
  providedIn: 'root'
})
export class CatGroupsChartService {

  constructor(protected http: HttpClient) {

  }

  public getCatGroupKpi(): Observable<any> {
    return this.http.get<ICatItem>(`${environment.apiUrl}/cat-items/find-by-category/3`);
  }

  //
  public getCatGroupKpiByDomain(domainCode: any): Observable<any> {
    // console.log(domainCode);
    return this.http.get<ICatItem[]>(`${environment.apiUrl}/cat-items/find-group-kpi-by-domain/${domainCode}`, {
      observe: 'response'
    });
  }

  public findDomainByGroupKpiCode(groupKpiCode: any): Observable<any> {
    // console.log(groupKpiCode);
    return this.http.get<ICatItem[]>(`${environment.apiUrl}/cat-items/find-domain-by-kpi/${groupKpiCode}`, {
      observe: 'response'
    });
  }

  public getListDomain(): Observable<any> {
    return this.http.get<ICatItem>(`${environment.apiUrl}/cat-items/find-by-category/2`);
  }

  public findDomainAndTable(): Observable<any> {
    return this.http.get<ICatItem>(`${environment.apiUrl}/cat-items/findDomainAndTable`);
  }

  public getListUnit(): Observable<any> {
    return this.http.get<ICatItem>(`${environment.apiUrl}/cat-items/find-by-category/4`);
  }

  public getCatItem(req?: any) {
    const options = createRequestOption(req);
    return this.http.get<ICatItem>(`${environment.apiUrl}/cat-items`, {
      params: options,
      observe: 'response'
    });
  }

// /api/cat-items?categoryCodes=GROUP_KPI&parentCode=VIEN_THONG&parentCategoryCodes=DOMAIN
  public query(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<ICatGroupsChart[]>(`${environment.apiUrl}/cat-group-charts`, {
      params: options,
      observe: 'response'
    });
  }

  public getGroupChart(req?: any): Observable<any> {
    return this.http.get<ICatGroupsChart[]>(`${environment.apiUrl}/cat-group-charts`, {
      params: req,
      observe: 'response'
    });
  }

  create(objModel: ICatGroupsChart): Observable<EntityResponseType> {
    return this.http.post<ICatGroupsChart>(`${environment.apiUrl}/cat-group-charts`, objModel, {observe: 'response'});
  }

  update(objModel: ICatGroupsChart): Observable<EntityResponseType> {
    return this.http.put<ICatGroupsChart>(`${environment.apiUrl}/cat-group-charts`, objModel, {observe: 'response'});
  }

  delete(id: any) {
    return this.http.delete(`${environment.apiUrl}/cat-group-charts/${id}`);
  }

  deleteChoose(req?: any) {
    const options = createRequestOption(req);
    return this.http.delete(`${environment.apiReportUrl}/report-categories` , {
      params: options,
      observe: 'response',
      headers: {
        'Accept-Language': 'vi'
      },
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<any>(`${environment.apiUrl}/cat-group-charts/${id}`, {observe: 'response'});
  }

  public getCatItemByCategoryId(id): Observable<any> {
    return this.http.get<ICatItem>(`${environment.apiUrl}/cat-items/find-by-category/${id}`);
  }

  deleteMultiple(objModel: any): Observable<EntityResponseType> {
    return this.http.post<any>(`${environment.apiUrl}/cat-group-charts/delete-multiple`, objModel, {observe: 'response'});
  }
}
