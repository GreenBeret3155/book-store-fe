import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {TreeviewItem} from '../components/tree-picker/ngx-treeview';
import {Observable} from 'rxjs';
import {ObjectForm} from '../model/object.module';
import {createRequestOption} from '../util/request-util';
import {BaseRptChart} from '../model/base-rpt-chart';
import {KpiReportDateModel} from '../model/kpi-report-date.model';



@Injectable({
  providedIn: 'root'
})
export class KpiReportService {
  constructor(private http: HttpClient) {
  }
  public searchCondition(req?: any, data?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.post<any[]>(`${environment.apiUrl}/kpi-report-search/search-condition`, data, {
      params: options,
      observe: 'response'
    });
  }

  /**
   * Lay cay chi tieu
   */
  getTreeKpi() {
    return this.http.get<Array<TreeviewItem>>(`${environment.apiUrl}/kpi-report/find-tree-kpi`);
  }

  updateTimeReport(kpiReportForm: any) {
    return this.http.post<KpiReportDateModel>(`${environment.apiUrl}/kpi-report/update-time-report`, kpiReportForm);
  }
  /**
   * Lay danh sach cac doi tuong
   */
  findObjectReport(kpiReportForm: any, req?: any) {
    const params = createRequestOption(req);
    return this.http.post<Array<TreeviewItem>>(`${environment.apiUrl}/kpi-report/find-object-report`, kpiReportForm, {params: params});
  }

  /**
   * Lay thong tin bieu do
   * @param kpiReportForm
   */
  getReportKpiChart(kpiReportForm: any, req?: any): Observable<HttpResponse<BaseRptChart>> {
    const params = createRequestOption(req);
    return this.http.post<any>(`${environment.apiUrl}/kpi-report/get-report-kpi-chart`, kpiReportForm, {params: params, observe: 'response'});
  }

  findReportKpi(kpiReportForm: any, req?: any): Observable<HttpResponse<Array<ObjectForm>>> {
    const params = createRequestOption(req);
    // console.log('FindReportKpi:', params);
    // console.log('FindReportKpi Form:', kpiReportForm);
    // console.log(params);
    return this.http.post<any>(`${environment.apiUrl}/kpi-report/find-report-kpi`, kpiReportForm, {params: params, observe: 'response'});
  }
  getChartDetail(id: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/config-charts/get-chart-detail/${id}`);
  }

  exportReportKpi(kpiReportForm: any, req?: any) {
    const params = createRequestOption(req);
    // console.log(params);
    return this.http.post(`${environment.apiUrl}/kpi-report/export-report-kpi`, kpiReportForm, {params: params, observe: 'response', responseType: 'arraybuffer' });
  }

  public query(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(`${environment.apiUrl}/kpi-report-query/search-condition`, {
      params: options,
      observe: 'response'
    });
  }
}
