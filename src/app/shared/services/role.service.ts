import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../../environments/environment';
import {createRequestOption} from '../util/request-util';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private http: HttpClient) {
  }

  getAllRole(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/roles/getAllRoles`, {
      observe: 'response'
    });
  }

  doSearch(data, req): Observable<any> {
    const options = createRequestOption(req);
    return this.http.post(`${environment.apiUrl}/roles/doSearch`, data, {
      params: options,
      observe: 'response'
    })
  }

  insert(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/roles/insert`, data, {
      observe: 'response'
    });
  }

  update(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/roles/update`, data, {
      observe: 'response'
    });
  }

  delete(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/roles/delete`, data, {
      observe: 'response'
    });
  }

  multiDelete(objModel: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/roles/multiple-delete`, objModel, {observe: 'response'});
  }

}
