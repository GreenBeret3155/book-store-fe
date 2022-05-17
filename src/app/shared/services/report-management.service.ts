import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createRequestOption} from '../util/request-util';
import {IReport} from '../model/report.model';
import {environment} from '../../../environments/environment';
type EntityResponseType = HttpResponse<IReport>;
@Injectable({
  providedIn: 'root'
})
export class ReportManagementService {
  constructor(protected http: HttpClient) {
  }
  public query(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<IReport[]>(`${environment.apiReportUrl}/report-categories`, {
      params: options,
      observe: 'response',
      headers: {
        'Accept-Language': 'vi'
      },
    });
  }
  create(report: any): Observable<EntityResponseType> {
    return this.http.post<IReport>(`${environment.apiReportUrl}/report-categories`, report, {observe: 'response' ,
      headers: {
        'Accept-Language': 'vi'
      },
    });
  }
  clone(id: any) {
    return this.http.post<any>(`${environment.apiReportUrl}/report-categories/copy/${id}`, {observe: 'response',
      headers: {
        'Accept-Language': 'vi'
      },
    });
  }
  update(report: any): Observable<EntityResponseType> {
    return this.http.put<IReport>(`${environment.apiReportUrl}/report-categories`, report, {observe: 'response',
      headers: {
        'Accept-Language': 'vi'
      },
    });
  }
  delete(req?: any) {
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
    return this.http.get<any>(`${environment.apiReportUrl}/report-categories/${id}`, {observe: 'response',
      headers: {
        'Accept-Language': 'vi'
      },
    });
  }}
