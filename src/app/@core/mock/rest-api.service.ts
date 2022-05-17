import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';


@Injectable({providedIn: 'root'})
export class RestApiService implements OnInit {
  constructor(private http: HttpClient,
              private $localStorage: LocalStorageService,
              private $sessionStorage: SessionStorageService) {
  }

  ngOnInit(): void {
  }

  setToken() {
    let token;
    try {
      // token = localStorage.getItem('httpHeaders');
      token = this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken') || '';
      if (token != null && token !== undefined) {
        return token;
      }
    } catch {
      token = '';
    }
    return '';

  }

  post(url, data: any): Observable<any> {
    const rs = this.http.post<any>(`${environment.apiUrl}${url}`, data, {
      headers: this.setToken(),
      observe: 'response',
      responseType: 'json',
    });
    return rs;
  }

  get(url): Observable<any> {
    const rs = this.http.get<any>(`${environment.apiUrl}${url}`, {
      headers: this.setToken(),
      observe: 'response',
      responseType: 'json',
    });
    return rs;
  }

}
