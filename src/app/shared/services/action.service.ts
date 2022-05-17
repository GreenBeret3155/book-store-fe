import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {createRequestOption} from "../util/request-util";

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  constructor(private http: HttpClient) {
  }

  doSearch(data, req) {
    const options = createRequestOption(req);
    return this.http.post<any>(`${environment.apiUrl}/action/doSearch`, data, {
      params: options,
      observe: 'response'
    });
  }

  public update(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/action/update`, data, {
      observe: 'response'
    });
  }

  public insert(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/action/insert`, data, {
      observe: 'response'
    });
  }

  public delete(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/action/delete`, data, {
      observe: 'response'
    });
  }

  public getAllAction(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/sys-actions-getAll`, {
      observe: 'response'
    });
  }
  public getActionTableMap(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/sys-actions/getAll`, data, {
      observe: 'response'
    });
  }
  
  multiDelete(objModel: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/action/multiple-delete`, objModel, {observe: 'response'});
  }
}
