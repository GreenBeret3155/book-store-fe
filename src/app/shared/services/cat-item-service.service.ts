import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ICatItem} from '../../@core/model/cat-item.model';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import 'rxjs-compat/add/operator/map';
import 'rxjs-compat/add/operator/share';
import * as moment from 'moment';
import {createRequestOption} from '../util/request-util';

export class CatItem {
  id: number;
  itemId: number;
  itemCode: string;
  itemName: string;
  itemValue: string;
  categoryId: number;
  categoryCode: string;
  position: number;
  description: string;
  editable: number;
  parentItemId: null;
  status: number;
  updateTime: number;
  updateUser: string;
}


@Injectable({
  providedIn: 'root'
})
export class CatItemServiceService {

  private timeTypes: any;
  observable;
  private timeBack: any;
  observableTimeBack;

  constructor(private http: HttpClient) {
  }

  getTimeTypes(id?) {
    if (this.timeTypes) {
      return of(this.timeTypes);
    } else if (this.observable) {
      return this.observable;
    } else {
      this.observable = this.http.get(`${environment.apiUrl}/cat-items/find-by-category/${id}`, {
        observe: 'response'
      })
        .map(response => {
          this.observable = null;
          if (response.status === 400) {
            return 'Request failed.';
          } else if (response.status === 200) {
            this.timeTypes = response.body;
            return this.timeTypes;
          }
        })
        .share();
      return this.observable;
    }
  }

  getTimeTypesByKpi(req?) {
    const options = createRequestOption(req);
    return this.http.get<any>(`${environment.apiUrl}/get-time-type-by-kpis`, {
      params: options,
    });
  }

  getTimeBack(id?) {
    if (this.timeBack) {
      return of(this.timeBack);
    } else if (this.observableTimeBack) {
      return this.observableTimeBack;
    } else {
      this.observableTimeBack = this.http.get(`${environment.apiUrl}/cat-items/find-by-category/${id}`, {
        observe: 'response'
      })
        .map(response => {
          this.observableTimeBack = null;
          if (response.status === 400) {
            return 'Request failed.';
          } else if (response.status === 200) {
            this.timeBack = response.body;
            return this.timeBack;
          }
        })
        .share();
      return this.observableTimeBack;
    }
  }

  findWarnningByKpiId(opt: any) {
    const options = createRequestOption(opt);
    return this.http.get<any>(`${environment.apiUrl}/kpi-warneds/get-warning-by-kpi-id`, {
      params: options,
    });
  }

  fetch(id) {
    return this.http.get<Array<CatItem>>(`${environment.apiUrl}/cat-items/find-by-category/${id}`);
  }

  fetchUpper(id) {
    return this.http.get<Array<CatItem>>(`${environment.apiUrl}/cat-items/find-by-category-upper/${id}`);
  }

  getTimeTypeMap(domainCode) {
    return this.http.get<Array<CatItem>>(`${environment.apiUrl}/cat-items/get-time-type-map/${domainCode}`);
  }

  getTimeByType(timeBacks: any, timeType: any, value, add?) {
    let timeback;
    switch (timeType) {
      case '1': {
        timeback = '';
        break;
      }
      case '2': {
        if (timeBacks.find(e => e.itemCode === 'NMONTH')) {
          timeback = Number(timeBacks.find(e => e.itemCode === 'NMONTH').itemValue);
        }
        if (moment.isDate(value)) {
          const result = moment(value).add(add ? (-1) * timeback : timeback, 'month').toDate();
          if (moment(result).isAfter(moment())) {
            return moment().toDate();
          } else {
            return result;
          }
        }
        break;
      }
      case '4': {
        if (timeBacks.find(e => e.itemCode === 'NYEAR')) {
          timeback = Number(timeBacks.find(e => e.itemCode === 'NYEAR').itemValue);
        }
        if (moment.isDate(value)) {
          const result = moment(value).add(add ? (-1) * timeback : timeback, 'year').toDate();
          if (moment(result).isAfter(moment())) {
            return moment().toDate();
          } else {
            return result;
          }
        }
        break;
      }
      case '3': {
        if (timeBacks.find(e => e.itemCode === 'NQUAR')) {
          timeback = Number(timeBacks.find(e => e.itemCode === 'NQUAR').itemValue);
        }
        if (moment.isDate(value)) {
          const result = moment(value).add(add ? (-1) * timeback : timeback, 'quarter').toDate();
          if (moment(result).isAfter(moment())) {
            return moment().toDate();
          } else {
            return result;
          }
        }
        break;
      }
    }


  }

  query(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<ICatItem[]>(`${environment.apiUrl}/cat-items`, {
      params: options,
      observe: 'response'
    });
  }

  getOwnDomain() {
    return this.http.get<ICatItem[]>(`${environment.apiUrl}/cat-items/find-domain-by-user`, {
      observe: 'response'
    });
  }

  findTableByDatabaseName(name) {
    return this.http.get<ICatItem[]>(`${environment.apiUrl}/cat-items/find-table-by-database/${name}`, {
      observe: 'response'
    });
  }

  getCatItemByCategoryCode(categoryCode: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/cat-items/get-catItem-by-categoryCode/${categoryCode}`, {
      observe: 'response'
    });
  }

  public search(req?: any, body?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.post<any[]>(`${environment.apiUrl}/cat-items/query`, body, {
      params: options,
      observe: 'response'
    });
  }

  public update(body?: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/cat-items`, body, {
      observe: 'response'
    });
  }

  public insert(body?: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/cat-items`, body, {
      observe: 'response'
    });
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/cat-items/${id}`);
  }

  getListCategory(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/cat-items-get-list-category`, {
      observe: 'response'
    });
  }

  getListParent(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/cat-items-get-list-parent`, {
      observe: 'response'
    });
  }

  getAllItem(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/cat-items-get-all`, {
      observe: 'response'
    });
  }

  getItem(id: any) {
    return this.http.get<any>(`${environment.apiUrl}/cat-items/${id}`, {
      observe: 'response'
    });
  }

  public getCatItemByCategoryId(id): Observable<any> {
    return this.http.get<ICatItem>(`${environment.apiUrl}/cat-items/find-by-category/${id}`);
  }

  multiDelete(objModel: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/cat-items/multiple-delete`, objModel, {observe: 'response'});
  }
}
