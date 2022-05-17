import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {createRequestOption} from "../util/request-util";

@Injectable({
  providedIn: 'root'
})
export class ModuleActionService {
  constructor(private http: HttpClient) {
  }

  public getAllByModuleId(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(`${environment.apiUrl}/moduleAction/getAllByModuleId`, {
      params: options,
      observe: 'response'
    });
  }

  public delete(body?: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/moduleAction/delete`, body, {
      observe: 'response'
    })
  }

  public insert(body?: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/moduleAction/insert`, body, {
      observe: 'response'
    })
  }
}
