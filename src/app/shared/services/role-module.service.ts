import {Injectable} from '@angular/core';
import {RestApiService} from '../../@core/mock/rest-api.service';


@Injectable({
  providedIn: 'root'
})
export class RoleModuleService {
  constructor(private http: RestApiService) {
  }

  getTreeByRoleId(data) {
    return this.http.post('/roleModule/getTreeByRoleId', data);
  }

  updateRoleModule(data) {
    return this.http.post('/roleModule/updateRoleModule', data);
  }
}
