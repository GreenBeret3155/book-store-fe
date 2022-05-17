import {Injectable, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterModule, Routes} from '@angular/router';
import {ProfileConfigComponent} from './profile-config/profile-config.component';
import {DynamicConfigComponent} from './dynamic-config.component';
import {EMPTY, Observable, of} from 'rxjs';
import {DashboardConfig, IDashboardConfig} from '../../shared/model/dashboardConfig.model';
import {DashboardService} from '../../shared/services/dashboard.service';
import {flatMap} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';
import {ChartModel, IChartModel} from '../../@core/model/chart.model';
import {ChartConfigService} from '../../shared/services/chart-config.service';
import {IProfileConfig, ProfileConfig} from '../../shared/model/profileConfig.model';
import {ProfileConfigService} from '../../shared/services/profile-config.service';
import {UpdateProfileComponent} from './profile-config/update-profile/update-profile.component';
import {CatGroupsChart, ICatGroupsChart} from '../../shared/model/cat-groups-chart';
import {CatGroupsChartService} from '../../shared/services/cat-groups-chart.service';
import {CatGraphKpi, ICatGraphKpi} from '../../shared/model/cat-graph-kpi.model';
import {CatGraphKpiService} from '../../shared/services/cat-graph-kpi.service';
import {ConfigMenuItem, IConfigMenuItem} from '../../shared/model/config-menu-item.model';
import {ConfigMenuItemService} from '../../shared/services/config-menu-item.service';
import {ConfigMenu, IConfigMenu} from '../../shared/model/config-menu.model';
import {ConfigMenuService} from '../../shared/services/config-menu.service';
import {BieumauKehoachchitieuService} from '../../shared/services/bieumau-kehoachchitieu.service';
import {BieumauKehoachchitieu, IBieumauKehoachchitieu} from '../../shared/model/bieumau-kehoachchitieu.model';
import {RoleModuleComponent} from './role-module/role-module.component';
import { ActionComponent } from './action/action.component';
import { AddActionComponent } from './action/addAction/addAction.component';
import { ModuleComponent } from './modules/module.component';
import { AddModuleComponent } from './modules/addModule/addModule.component';
import {AddRoleComponent} from './role-module/add-role/add-role.component';
import { MapModuleComponent } from './modules/map-module/map-module.component';
import {MapPopupComponent} from './role-module/map-popup/map.popup.component';

@Injectable({providedIn: 'root'})
export class DashboardResolve implements Resolve<IDashboardConfig> {
  constructor(private service: DashboardService, private router: Router) {
    // console.log(service, router);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IDashboardConfig> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((res: HttpResponse<DashboardConfig>) => {
          if (res.body) {
            return of(res.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DashboardConfig());
  }
}

@Injectable({providedIn: 'root'})
export class ChartResolve implements Resolve<IChartModel> {
  constructor(private service: ChartConfigService, private router: Router) {
    // console.log(service, router);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IChartModel> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((res: HttpResponse<IChartModel>) => {
          if (res.body) {
            return of(res.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ChartModel());
  }
}

@Injectable({providedIn: 'root'})
export class ChartConfigResolve implements Resolve<any> {
  constructor(private service: ChartConfigService, private router: Router) {
    // console.log(service, router);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((res: HttpResponse<any>) => {
          if (res.body) {
            res.body.timeTypeDefault = res.body.timeTypeDefault ? res.body.timeTypeDefault.toString() : null;
            if (res.body.chartConfig) {
              res.body.chartConfig = JSON.parse(res.body.chartConfig);
            }
            return of(res.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of({
      chartConfig: {
        legend: {
          align: null,
          verticalAlign: null,
        },
        colors: []
      },
      items: [{}]
    });
  }
}

@Injectable({providedIn: 'root'})
export class ProfileResolve implements Resolve<IProfileConfig> {
  constructor(private service: ProfileConfigService, private router: Router) {
    // console.log(service, router);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IProfileConfig> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((res: HttpResponse<IProfileConfig>) => {
          if (res.body) {
            return of(res.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProfileConfig());
  }
}

@Injectable({providedIn: 'root'})
export class CatGroupChartResolve implements Resolve<ICatGroupsChart> {
  constructor(private service: CatGroupsChartService, private router: Router) {
    // console.log(service, router);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ICatGroupsChart> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((res: HttpResponse<ICatGroupsChart>) => {
          if (res.body) {
            console.log('res.body', res.body);
            return of(res.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CatGroupsChart());
  }
}

@Injectable({providedIn: 'root'})
export class CatGraphKpiResolve implements Resolve<ICatGraphKpi> {
  constructor(private service: CatGraphKpiService, private router: Router) {
    // console.log(service, router);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ICatGraphKpi> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((res: HttpResponse<ICatGraphKpi>) => {
          if (res.body) {
            console.log('res.body', res.body);
            return of(res.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CatGraphKpi());
  }
}

@Injectable({providedIn: 'root'})
export class BieumauKehoachchitieuResolve implements Resolve<IBieumauKehoachchitieu> {
  constructor(private service: BieumauKehoachchitieuService, private router: Router) {
    // console.log(service, router);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IBieumauKehoachchitieu> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((res: HttpResponse<IBieumauKehoachchitieu>) => {
          if (res.body) {
            console.log('res.body', res.body);
            return of(res.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new BieumauKehoachchitieu());
  }
}

@Injectable({providedIn: 'root'})
export class ConfigMenuItemResolve implements Resolve<IConfigMenuItem> {
  constructor(private service: ConfigMenuItemService, private router: Router) {
    // console.log(service, router);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IConfigMenuItem> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((res: HttpResponse<IConfigMenuItem>) => {
          if (res.body) {
            console.log('res.body', res.body);
            return of(res.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ConfigMenuItem());
  }
}

@Injectable({providedIn: 'root'})
export class ConfigMenuResolve implements Resolve<IConfigMenu> {
  constructor(private service: ConfigMenuService, private router: Router) {
    // console.log(service, router);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IConfigMenu> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((res: HttpResponse<IConfigMenu>) => {
          if (res.body) {
            console.log('res.body', res.body);
            return of(res.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ConfigMenu());
  }
}

const routes: Routes = [
  {
    path: '',
    component: DynamicConfigComponent,
    children: [
      {
        path: 'profile',
        data: {
          breadcrumb: {label: 'Cấu hình Profile'},
        },
        children: [
          {
            path: '',
            component: ProfileConfigComponent,
            data: {
              breadcrumb: {
                label: 'Danh sách'
              },
            },
          },
          {
            path: 'edit/:id',
            component: UpdateProfileComponent,
            resolve: {
              profile: ProfileResolve
            },
            data: {
              breadcrumb: {
                label: 'Cập nhật Profile',
                // unitField: 'profile',
                // fieldName: 'profileName'
              },
            },
          },
          {
            path: 'new',
            component: UpdateProfileComponent,
            resolve: {
              profile: ProfileResolve
            },
            data: {
              breadcrumb: {
                label: 'Thêm mới Profile',
              },
            },
          }
        ]
      },
      {
        path: 'role-module',
        data: {
          breadcrumb: {label: 'Quản lý nhóm quyền'},
        },
        children: [
          {
            path: '',
            component: RoleModuleComponent,
            data: {
              breadcrumb: {
                label: 'Danh sách'
              },
            },
          },
          {
            path: 'edit/:id',
            component: AddRoleComponent,
            resolve: {
              objectModel: RoleModuleComponent
            },
            data: {
              breadcrumb: {
                label: 'Cập nhật nhóm quyền',
                // unitField: 'cat-groups-chart',
                // fieldName: 'cat-groups-chart'
              },
            },
          },
          {
            path: 'new',
            component: AddRoleComponent,
            resolve: {
              objectModel: RoleModuleComponent
            },
            data: {
              breadcrumb: {
                label: 'Thêm mới nhóm quyền',
              }
            },
          },
          {
            path: 'map-popup',
            component: MapPopupComponent,
            resolve: {
              objectModel: RoleModuleComponent
            },
            data: {
              breadcrumb: {
                label: 'Thao tác quyền với module',
                // unitField: 'cat-groups-chart',
                // fieldName: 'cat-groups-chart'
              },
            },
          },
        ]
      },
      {
        path: 'actions',
        data: {
          breadcrumb: {label: 'Quản lý Action'},
        },
        children: [
          {
            path: '',
            component: ActionComponent,
            data: {
              breadcrumb: {
                label: 'Danh sách'
              },
            },
          },
          {
            path: 'add',
            component: AddActionComponent,
            resolve: {
              objectModel: ActionComponent
            },
            data: {
              breadcrumb: {
                label: 'Thêm mới Action',
              },
            },
          },
        ]
      },
      {
        path: 'modules',
        data: {
          breadcrumb: {label: 'Quản lý Module'},
        },
        children: [
          {
            path: '',
            component: ModuleComponent,
            data: {
              breadcrumb: {
                label: 'Danh sách'
              },
            },
          },
          {
            path: 'add',
            component: AddModuleComponent,
            resolve: {
              objectModel: ModuleComponent
            },
            data: {
              breadcrumb: {
                label: 'Thêm mới Module',
              },
            },
          },
          {
            path: 'map',
            component: MapModuleComponent,
            resolve: {
              objectModel: ModuleComponent
            },
            data: {
              breadcrumb: {
                label: 'Mapping Module',
              },
            },
          },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicConfigRoutingModule {
}
