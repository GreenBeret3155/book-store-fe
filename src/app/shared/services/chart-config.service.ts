import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ICatItem} from '../../@core/model/cat-item.model';
import {createRequestOption} from '../util/request-util';
import {IChartModel} from '../../@core/model/chart.model';
import {DataChartMap, IDataChartMap} from '../../@core/model/data-chart-map.model';
import {IRangeColor} from '../../@core/model/range-color.model';

type EntityResponseType = HttpResponse<IChartModel>;

@Injectable({
  providedIn: 'root'
})
export class ChartConfigService {

  globalFilterObjectDetail: Subject<any> = new Subject<any>();
  globalFilterObject: Subject<any> = new Subject<any>();
  changeKpiFromMap: Subject<any> = new Subject<any>();

  constructor(protected http: HttpClient) {
  }

  public query(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(`${environment.apiUrl}/config-charts/get-all`, {
      params: options,
      observe: 'response'
    });
  }
  public find_chart_assigned(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(`${environment.apiUrl}/config-charts/get-all-assign`, {
      params: options,
      observe: 'response'
    });
  }

  public getUserReceive(chartId?: any) {
    return this.http.get<any[]>(`${environment.apiUrl}/notification/user-recived-alarm/${chartId}`);
  }

  public getChartByChartIds(chartIds?: any) {
    const options = createRequestOption(chartIds);
    return this.http.get<any[]>(`${environment.apiUrl}/config-charts/get-all-by-ids`, {
      params: options,
      observe: 'response'
    });
  }

  public getImage(image?: any) {
    const options = createRequestOption(image);
    return this.http.get(`${environment.apiUrl}/config-charts/view-chart-icon/${image}`, {
      observe: 'response',
      responseType: 'blob'
    });
  }

  public sendWarning(formData?: any) {
    return this.http.post(`${environment.apiUrl}/notifications`, formData);
  }

  public sendEmail(req?: any) {
    // const options = createRequestOption(req);
    return this.http.post(`${environment.apiUrl}/emails`, req, {
      observe: 'response'
    });
  }

  public test(): Observable<any> {
    return this.http.get<any[]>(`${environment.apiUrl}/config-charts`);
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<any>(`${environment.apiUrl}/config-charts/${id}`, {observe: 'response'});
  }

  public getDataSource(): Observable<any> {
    return this.http.get<ICatItem>(`${environment.apiUrl}/cat-items/find-by-category/21`);
  }

  public getDomainCode(): Observable<any> {
    return this.http.get<ICatItem>(`${environment.apiUrl}/cat-items?categoryCodes=DOMAIN`);
  }

  public getTableDetail(itemValue: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/build-chart/get-description/${itemValue}`);
  }

  public getDataChartMaps(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<IDataChartMap>(`${environment.apiUrl}/get-data-chart-maps`, {
      params: options,
      observe: 'response'
    });
  }

  public getMaxTime(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<Object>(`${environment.apiUrl}/get-max-time-of-kpi`, {
      params: options,
      observe: 'response'
    });
  }

  public getRangeColor(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<IRangeColor>(`${environment.apiUrl}/get-range-of-color`, {
      params: options,
      observe: 'response'
    });
  }

  public getTypeData(): Observable<any> {
    return this.http.get<ICatItem>(`${environment.apiUrl}/cat-items/find-by-category/22`);
  }

  public getGroup(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any>(`${environment.apiUrl}/cat-items`, {
      params: options,
      observe: 'response'
    });
  }

  public getGroupChart(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any>(`${environment.apiUrl}/cat-group-charts`, {
      params: options,
      observe: 'response'
    });
  }

  public preview(data) {
    return this.http.post(`${environment.apiUrl}/config-charts/preview`, data);
  }

  public save(data, file) {
    console.log('file:', file);
    if (file) {
      let formData = new FormData();
      // formData.append('data', data);
      formData = this.convertJsontoFormData(data, null, formData);
      formData.append('image', file);
      return this.http.post(`${environment.apiUrl}/config-charts-icon`, formData);
    } else {
      return this.http.post(`${environment.apiUrl}/config-charts`, data);
    }
  }

  public update(data, file) {
    console.log('file:', file);
    if (file) {
      let formData = new FormData();
      formData = this.convertJsontoFormData(data, null, formData);
      formData.append('image', file);
      return this.http.post(`${environment.apiUrl}/config-charts-update-icon`, formData);
    } else {
      return this.http.post(`${environment.apiUrl}/config-charts-update`, data);
    }
  }

  public delete(id) {
    return this.http.delete(`${environment.apiUrl}/config-charts/${id}`);
  }

  public deleteAll(ids) {
    return this.http.post(`${environment.apiUrl}/config-charts/delete-all`, ids);
  }

  public clone(id) {
    return this.http.post(`${environment.apiUrl}/config-charts/clone/${id}`, null);
  }

  public getTableDetailFull(req: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any>(`${environment.apiUrl}/get-table-description`, {
      params: options,
    });
  }

  public analyzeSql(sql: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/analyze-sql`, sql);
  }

  getScreenMapId(id: number): Observable<EntityResponseType> {
    return this.http.get<any>(`${environment.apiUrl}/get-screen-maps-id/${id}`, {observe: 'response'});
  }

  convertJsontoFormData(jsonObject: Object, parentKey, carryFormData: FormData): FormData {

    const formData = carryFormData || new FormData();
    let index = 0;

    for (const key in jsonObject) {
      if (jsonObject.hasOwnProperty(key)) {
        if (jsonObject[key] !== null && jsonObject[key] !== undefined) {
          let propName = parentKey || key;
          if (parentKey && this.isObject(jsonObject)) {
            propName = parentKey + '[' + key + ']';
          }
          if (parentKey && this.isArray(jsonObject)) {
            propName = parentKey + '[' + index + ']';
          }
          if (jsonObject[key] instanceof File) {
            formData.append(propName, jsonObject[key]);
          } else if (jsonObject[key] instanceof FileList) {
            for (let j = 0; j < jsonObject[key].length; j++) {
              formData.append(propName + '[' + j + ']', jsonObject[key].item(j));
            }
          } else if (this.isArray(jsonObject[key]) || this.isObject(jsonObject[key])) {
            this.convertJsontoFormData(jsonObject[key], propName, formData);
          } else if (typeof jsonObject[key] === 'boolean') {
            formData.append(propName, +jsonObject[key] ? '1' : '0');
          } else {
            formData.append(propName, jsonObject[key]);
          }
        }
      }
      index++;
    }
    return formData;
  }

  isArray(val) {
    const toString = ({}).toString;
    return toString.call(val) === '[object Array]';
  }

  isObject(val) {
    return !this.isArray(val) && typeof val === 'object' && !!val;
  }


}
