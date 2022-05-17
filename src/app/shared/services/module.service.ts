import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../util/request-util';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  constructor(private http: HttpClient) {
  }

  public doSearch(data: any, req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.post(`${environment.apiUrl}/module/doSearch`, data, {
      params: options,
      observe: 'response'
    })
  }

  public update(data): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/module/update`, data, {
      observe: 'response'
    });
  }

  public insert(data): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/module/insert`, data, {
      observe: 'response'
    });
  }

  public delete(data): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/module/delete`, data, {
      observe: 'response'
    });
  }

  public getParent(): Observable<any> {
    return this.http.post<any[]>(`${environment.apiUrl}/module/getParent`, {}, {
      observe: 'response'
    });
  }
  public getTreeParent(): Observable<any> {
    return this.http.post<any[]>(`${environment.apiUrl}/module/getTreeParent`, {}, {
      observe: 'response'
    });
  }

  public getTreeParentActive(): Observable<any> {
    return this.http.post<any[]>(`${environment.apiUrl}/module/getTreeParentActive`, {}, {
      observe: 'response'
    });
  }

  public getAllModule(): Observable<any> {
    return this.http.get<any[]>(`${environment.apiUrl}/module/getAllModule`, {
      observe: 'response'
    });
  }

  multiDelete(objModel: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/module/multiple-delete`, objModel, {observe: 'response'});
  }
}
