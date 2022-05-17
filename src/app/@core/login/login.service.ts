import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {flatMap} from 'rxjs/operators';

import {Login} from './login.model';
import {AccountService} from '../auth/account.service';
import {AuthServerProvider} from '../auth/auth-jwt.service';
import {Account} from '../user/account.model';
import {Router} from '@angular/router';
import {LoginProgramModel} from '../model/login-program.model';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';

type EntityResponseType = HttpResponse<LoginProgramModel>;

@Injectable({providedIn: 'root'})
export class LoginService {
  constructor(private accountService: AccountService,
              private authServerProvider: AuthServerProvider,
              protected http: HttpClient,
              private router: Router) {
  }

  login(credentials: Login): Observable<Account | null> {
    return this.authServerProvider.login(credentials).pipe(flatMap(() => this.accountService.identity(true)));
  }

  authenticationcate(authenticationcate: any): Observable<EntityResponseType> {
    return this.http.post<LoginProgramModel>(`${environment.apiUrl}/authenticationcate`, authenticationcate, {observe: 'response'});
  }

  logout(): void {
    this.authServerProvider.logout().subscribe(null, null, () => {this.accountService.authenticate(null);
    this.router.navigate(['auth/login']);
    });
  }
}
