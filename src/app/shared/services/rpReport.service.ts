import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RpReportService {

  constructor(private http: HttpClient) {
  }

  getAllReport(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/rp-reports-list`, {
      observe: 'response'
    });
  }
}
