import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {Login} from '../login/login.model';
import {environment} from '../../../environments/environment';
import {DeviceDetectorService} from 'ngx-device-detector';

interface JwtToken {
  id_token: string;
}

interface LoginProgramModel {
  userName: string;
  passwordHash: string
  listObjects: any;
  httpHeaders: any;
  Authorization: string;
  fullName: string;
  customUserDetails: any;
  data: any;
  detail: any;
}

@Injectable({providedIn: 'root'})
export class AuthServerProvider {

  constructor(private http: HttpClient, private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService) {
  }

  getToken(): string {
    return this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken') || '';
  }
  login(credentials: Login): Observable<void> {
    return this.http
      .post<LoginProgramModel>(environment.apiUrl + '/authenticate', credentials)
      .pipe(map(response => this.authenticateSuccess(response, credentials.rememberMe)));
  }

  logout(): Observable<void> {
    /*const deviceToken = 'test_1';
    this.http.get<string>(`${environment.apiUrl}/logout/${deviceToken}`).subscribe();*/
    return new Observable(observer => {
      this.$localStorage.clear('authenticationToken');
      this.$sessionStorage.clear('authenticationToken');
      this.$localStorage.clear('lstObjects');
      this.$sessionStorage.clear('lstObjects');
      this.$localStorage.clear('pathDefault');
      this.$sessionStorage.clear('pathDefault');
      observer.complete();
    });
  }

  private authenticateSuccess(response: any, rememberMe: boolean): void {
    const jwt = response.jwtToken.id_token;
    const lstObjects = response.listObjects;
    const pathDefault = response.path;
    if (rememberMe) {
      this.$localStorage.store('authenticationToken', jwt);
      this.$localStorage.store('lstObjects', lstObjects);
      this.$localStorage.store('pathDefault', pathDefault);
    } else {
      this.$sessionStorage.store('authenticationToken', jwt);
      this.$sessionStorage.store('lstObjects', lstObjects);
      this.$sessionStorage.store('pathDefault', pathDefault);


    }
  }

}
