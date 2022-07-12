import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {role} from '../../pages/pages.component';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router,
              private $localStorage: LocalStorageService,
              private $sessionStorage: SessionStorageService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken') || '';
    console.log("token", token);
    
    if (token === undefined || token === null || token === '') {
      // localStorage.clear();
      this.router.navigate(['/auth/login']);
      return false;
    }
    let checkRole = false;
    const obj = this.$localStorage.retrieve('lstObjects') || this.$sessionStorage.retrieve('lstObjects') || '';
    try {
      if (state.url === '/pages/dashboard' || state.url === '/pages/404') {
        return true;
      }
      for (let i = 0; i < obj.length; i++) {
        const path =  state.url.substring(0, obj[i].link.length);
        if(path !== undefined && path.indexOf('/pages/screen') >= 0  && obj[i].link === '/pages/dashboard') {
          return true;
        }
        if (path !== '' && path !== undefined && obj[i].link === path) {
          role.slice(0, role.length);
          role.unshift( obj[i]);
          checkRole = true;
        }
      }
      if (!checkRole) {
        this.router.navigate(['/pages/404']);
        return false;
      }
    } catch (e) {
      localStorage.clear();
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}
