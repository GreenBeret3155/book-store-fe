import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {RoleService} from '../../../shared/services/role.service';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {AddRoleComponent} from './add-role/add-role.component';
import {MapPopupComponent} from './map-popup/map.popup.component';
import {TranslateService} from '@ngx-translate/core';
import {ConfirmDialogComponent} from '../../../share-lib-module/confirm-dialog/confirm-dialog.component';
import {HttpHeaders} from '@angular/common/http';
import {DashboardService} from '../../../shared/services/dashboard.service';
import {checkRoleAction} from '../../pages.component';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'ngx-permission-management',
  templateUrl: './role-module.component.html',
  styleUrls: ['./role-module.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RoleModuleComponent implements OnInit {
  loading = false;
  input = {
    name: '', code: '', status: null,
  };
  rows: Object[];
  page = {
    limit: 10,
    count: 0,
    offset: 0,
  };
  listStatus = [
    {name: 'user.status.1', code: 1},
    {name: 'user.status.0', code: 0}
  ]
  selected: any[] = [];
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  checkboxColumns = {name: '', prop: 'checkbox', flexGrow: 0.2};
  columns = [
    {name: 'role_module.index', prop: 'index', flexGrow: 0.5},
    {name: 'role_module.code', prop: 'code', flexGrow: 1.5},
    {name: 'role_module.name', prop: 'name', flexGrow: 1.7},
    {name: 'role_module.update_time', prop: 'updateTime', flexGrow: 1.5},
    {name: 'role_module.status', prop: 'status', flexGrow: 1},
    {name: 'role_module.default_module', prop: 'defaultModuleName', flexGrow: 1.3},
    {name: 'role_module.map_popup', prop: 'editModule', flexGrow: 1.7},
    {name: 'role_module.tools', prop: 'action_btn', flexGrow: 1}
  ];
  currentTheme: any = 'dark';

  constructor(private roleService: RoleService,
              private dialogService: NbDialogService,
              private toastr: NbToastrService,
              private dashboardService: DashboardService,
              private $localStorage: LocalStorageService,
              private $sessionStorage: SessionStorageService,
              private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.dashboardService.currentTheme.subscribe(e => {
      if (e && this.currentTheme !== e) {
        this.currentTheme = e
      }
    })
    this.search(0);
  }

  protected onSuccess(data: any | null, headers: HttpHeaders, page: number): void {
    // console.log(data);
    this.page.count = Number(headers.get('X-Total-Count'));
    this.page.offset = page || 0;
    this.rows = data || [];
    this.changeCheckboxStatus();
    this.selected = [];
  }

  pageCallback(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number }) {
    this.page.offset = pageInfo.offset;
    this.search(this.page.offset)
  }

  search(pageToLoad) {
    this.loading = true;
    this.page.offset = pageToLoad;
    this.roleService.doSearch(this.input, {
      page: this.page.offset,
      size: this.page.limit
    }).subscribe(
      (res) => this.onSuccess(res.body, res.headers, pageToLoad),
      (error) => {
        this.loading = false;
      },
      () => this.loading = false,
    );
  }

  changeCheckboxStatus() {
    if (this.page.count === 0) {
      const temp = this.columns.find( e => e.prop === 'checkbox');
      if (temp) {
        const index = this.columns.indexOf(temp);
        this.columns.splice(index, 1);
      }
    } else {
      const temp = this.columns.find( e => e.prop === 'checkbox');
      if (!temp) {
        this.columns.unshift(this.checkboxColumns);
      }
    }
  }

  editRole(data) {
    let title = '';
    if (data == null) {
      title = this.translate.instant('role_module.title_add');
    } else {
      title = this.translate.instant('role_module.title_edit') + ' ' + data.name;
    }
    this.dialogService.open(AddRoleComponent, {
      context: {
        title: title,
        data: data,
      },
      // dialogClass: 'modal-full',
      hasScroll: true,
    }).onClose.subscribe(
      value => {
        if (value) {
          this.search(0);
          if (data == null) {
            this.toastr.success(this.translate.instant('role_module.content_add_success')
              , this.translate.instant('user.title_notification'));
          } else {
            this.toastr.success(this.translate.instant('role_module.content_edit_success'),
              this.translate.instant('user.title_notification'));
          }
        }
      },
    );
  }

  multiDelete() {
    this.dialogService.open(ConfirmDialogComponent, {
      context: {
        message: this.translate.instant('role_module.message_multi_delete'),
      }
    }).onClose.subscribe(res => {
      if (res) {
        this.roleService.multiDelete(this.selected).subscribe(() => {
          this.toastr.success(this.translate.instant('role_module.delete_success'), 'Thông báo');
          this.search(this.page.offset);
        }, (err) => {
          this.toastr.danger(err.error.message, 'Lỗi');
        })
        this.selected = [];
      }
    })
  }

  deleteRole(data) {
    this.dialogService.open(ConfirmDialogComponent, {
      context: {
        message: this.translate.instant('role_module.message_delete') + ' ' + data.name,
      }
    }).onClose.subscribe(res => {
      if (res) {
        this.roleService.delete(data).subscribe(
          () => {
            this.toastr.success(this.translate.instant('role_module.delete_success'),
              this.translate.instant('user.title_notification'));
            this.search(0);
          },
          (error) => {
            if (error.error.title) {
              this.toastr.danger(error.error.title,
                this.translate.instant('user.title_notification'));
            } else {
              this.toastr.danger(this.translate.instant('role-module.unknown_error'),
                this.translate.instant('user.title_notification'));
            }
          }
        )
      }
    })
  }

  openMapComponent(data) {
    this.dialogService.open(MapPopupComponent, {
      context: {
        title: this.translate.instant('role_module.title_map_popup') + ' ' + data.name,
        data: data,
      },
      // dialogClass: 'map-modal-full',
      hasScroll: true,
    }).onClose.subscribe(
      value => {
        if (value) {
          this.toastr.success(this.translate.instant('role_module.map_popup_success'),
            this.translate.instant('user.title_notification'));
        }
      },
    );
  }

  check(roleAction: string) {
    return checkRoleAction(roleAction);
  }
}
