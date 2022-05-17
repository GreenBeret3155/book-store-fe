import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {createRequestOption} from '../util/request-util';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {IBieumauKehoachchitieu} from '../model/bieumau-kehoachchitieu.model';

type EntityResponseType = HttpResponse<IBieumauKehoachchitieu>;

@Injectable({
  providedIn: 'root'
})
export class BieumauKehoachchitieuService {

  constructor(protected http: HttpClient) {
  }

  public query(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<IBieumauKehoachchitieu[]>(`${environment.apiUrl}/bieumau-kehoachchitieu/query`, {
      params: options,
      observe: 'response'
    });
  }

  create(objModel: IBieumauKehoachchitieu): Observable<EntityResponseType> {
    return this.http.post<IBieumauKehoachchitieu>(`${environment.apiUrl}/bieumau-kehoachchitieu`, objModel, {observe: 'response'});
  }

  update(objModel: IBieumauKehoachchitieu): Observable<EntityResponseType> {
    return this.http.put<IBieumauKehoachchitieu>(`${environment.apiUrl}/bieumau-kehoachchitieu`, objModel, {observe: 'response'});
  }

  delete(id: any) {
    return this.http.delete(`${environment.apiUrl}/bieumau-kehoachchitieu/${id}`);
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<any>(`${environment.apiUrl}/bieumau-kehoachchitieu/${id}`, {observe: 'response'});
  }

  getGraphKpiByDomain(domainCode: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/bieumau-kehoachchitieus-domain-code/${domainCode}`, {observe: 'response'});
  }

  import(formData: FormData): Observable<EntityResponseType> {
    return this.http.post(`${environment.apiUrl}/bieumau-kehoachchitieu/import`, formData, {observe: 'response'});
  }

  downloadFile(dataForm: any): Observable<any> {
      const options = createRequestOption(dataForm);
    return this.http.post(`${environment.apiUrl}/bieumau-kehoachchitieu/downloadTemplate`, null, {
      params: options,
      observe: 'response',
      responseType: 'arraybuffer'
    });
  }
  downloadFileError(dataForm: any): Observable<any> {
    const options = createRequestOption(dataForm);
    return this.http.post(`${environment.apiUrl}/bieumau-kehoachchitieu/download`, null, {
      params: options,
      observe: 'response',
      responseType: 'arraybuffer'
    });
  }
  multiDelete(objModel: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/bieumau-kehoachchitieu/multiple-delete`, objModel, {observe: 'response'});
  }
}
