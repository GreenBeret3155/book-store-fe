import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LayoutService} from '../../../../@core/utils';
import {NbDialogRef} from '@nebular/theme';
import {RoleModuleService} from '../../../../shared/services/role-module.service';
import {TreeviewConfig} from 'ngx-treeview';
import {Router} from '@angular/router';
import {formatDataModule} from '../../../../@core/utils/common';
import {LoginService} from '../../../../@core/login/login.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'ngx-map-popup',
  templateUrl: './map-popup.component.html',
  styleUrls: ['./map-popup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MapPopupComponent implements OnInit {
  loading = true;
  title: string;
  data: any;
  dataItems = [];
  isCollapse: boolean = false;
  treeViewConfig = TreeviewConfig.create({
    hasFilter: true,
    hasAllCheckBox: false,
    maxHeight: undefined,
    hasCollapseExpand: false,
  });
  values = [];

  constructor(private layoutService: LayoutService,
              private roleModuleService: RoleModuleService,
              private ref: NbDialogRef<MapPopupComponent>,
              private loginService: LoginService,
              private $localStorage: LocalStorageService,
              private $sessionStorage: SessionStorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.roleModuleService.getTreeByRoleId(this.data).subscribe(
      (value) => {
        this.dataItems = formatDataModule(value.body, 0);
      },
      (error) => {
        this.loading = false;
      },
      () => this.loading = false,
    );
    this.layoutService.onCollapse.subscribe(value => this.isCollapse = value);
  }

  submit() {
    this.loading = true;
    const data = [];
    this.values.map(value => {
        const a = value.value.split('#_#_@@');
        data.push({roleId: this.data.id, moduleCode: a[0], actionCode: a[1]});
    });
    this.roleModuleService.updateRoleModule({
      roleId: this.data.id,
      list: data,
    }).subscribe(
      (success) => {
      },
      (error) => {
        this.loading = false;
      },
      () => {
        this.loading = false;
        this.loginService.authenticationcate({}).subscribe(res => {
          if (res.status === 200) {
            const obj = res.body.listObjects;
            this.$localStorage.store('lstObjects', obj);
            this.$sessionStorage.store('lstObjects', obj);
          }
        }, err => {
          this.$localStorage.clear('lstObjects');
          this.$sessionStorage.clear('lstObjects');
          this.router.navigate(['auth/login']);
        });
        this.ref.close('success');
      },
    );
  }

  cancel() {
    this.ref.close();
  }

}
