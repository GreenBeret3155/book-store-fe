import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../util/request-util';
import {IProfileConfig} from '../model/profileConfig.model';
type EntityResponseType = HttpResponse<IProfileConfig>;

@Injectable({
  providedIn: 'root'
})
export class ProfileConfigService {

  constructor(protected http: HttpClient) {
  }
  public query(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<IProfileConfig[]>(`${environment.apiUrl}/config-profiles`, {
      params: options,
      observe: 'response'
    });
  }
  create(book: IProfileConfig): Observable<EntityResponseType> {
    return this.http.post<IProfileConfig>(`${environment.apiUrl}/config-profiles`, book, {observe: 'response'});
  }
  clone(id: any) {
    return this.http.post<any>(`${environment.apiUrl}/config-profiles/copy/${id}`, {observe: 'response'});
  }
  update(book: IProfileConfig): Observable<EntityResponseType> {
    return this.http.put<IProfileConfig>(`${environment.apiUrl}/config-profiles`, book, {observe: 'response'});
  }
  delete(id: any) {
    return this.http.delete(`${environment.apiUrl}/config-profiles/${id}`);
  }
  deleteAll(ids: any) {
    return this.http.post(`${environment.apiUrl}/config-profiles/delete-all`, ids);
  }
  find(id: number): Observable<EntityResponseType> {
    return this.http.get<any>(`${environment.apiUrl}/config-profiles/${id}`, {observe: 'response'});
  }
}
