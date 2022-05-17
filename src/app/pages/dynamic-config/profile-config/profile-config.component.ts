import {Component, OnInit} from '@angular/core';
import {Page} from '../../../@core/model/page.model';
import {HttpHeaders} from '@angular/common/http';
import {ProfileConfigService} from '../../../shared/services/profile-config.service';
import {IProfileConfig, ProfileConfig} from '../../../shared/model/profileConfig.model';
import {Router} from '@angular/router';
import {NbDialogService, NbIconConfig, NbToastrService} from '@nebular/theme';
import {ConfirmDialogComponent} from '../../../share-lib-module/confirm-dialog/confirm-dialog.component';
import {SessionStorageService} from 'ngx-webstorage';
import {TranslateService} from '@ngx-translate/core';
import {DashboardService} from '../../../shared/services/dashboard.service';

@Component({
  selector: 'ngx-profile-config',
  templateUrl: './profile-config.component.html',
  styleUrls: ['./profile-config.component.scss']
})
export class ProfileConfigComponent implements OnInit {
  page = new Page();
  profiles?: ProfileConfig[] = new Array<ProfileConfig>();
  selected: any[] = [];
  columns = [
    {name: 'reportManagement.column.index', prop: 'checkbox', flewGrow: 0.5},
    {name: 'profile.column.index', prop: 'id', flewGrow: 0.5},
    {name: 'profile.column.profileCode', prop: 'profileCode', flewGrow: 1.5},
    {name: 'profile.column.profileName', prop: 'profileName', flewGrow: 2},
    {name: 'profile.column.description', prop: 'description', flewGrow: 1.5},
    {name: 'profile.column.isDefault', prop: 'isDefault', flewGrow: 1.5},
    {name: 'profile.column.updateUser', prop: 'updateUser', flewGrow: 1.3},
    {name: 'profile.column.updateTime', prop: 'updateTime', flewGrow: 1.5},
    {name: 'profile.column.actionBtn', prop: 'action_btn', flewGrow: 2}
  ];
  data: IProfileConfig[];
  currentTheme: any = 'dark';

  constructor(public serviceProfile: ProfileConfigService, private router: Router, private dialogService: NbDialogService,
              private toastrService: NbToastrService, private sessionStorageService: SessionStorageService,
              private translate: TranslateService, private dashboardService: DashboardService,
  ) {
    this.page.pageNumber = 0;
    this.page.size = 10;
  }

  ngOnInit() {
    this.dashboardService.currentTheme.subscribe(e => {
      if (e && this.currentTheme !== e) {
        this.currentTheme = e;
      }
    })
    const profilePageInfo = this.sessionStorageService.retrieve('profilePageInfo');
    if (profilePageInfo) {
      this.page = profilePageInfo;
      this.sessionStorageService.clear('profilePageInfo');
    }
    const profileFilterData = this.sessionStorageService.retrieve('profileFilter');
    if (profileFilterData) {
      this.data = profileFilterData;
      this.sessionStorageService.clear('profileFilter');
    }
    this.setPage(this.page);
  }

  setPage(profilePageInfo) {
    const pageToLoad: number = profilePageInfo.offset || profilePageInfo.pageNumber;
    this.serviceProfile.query({
      keyword: this.data,
      page: pageToLoad,
      size: this.page.size
    }).subscribe(res => this.onSuccess(res.body, res.headers, pageToLoad));
  }
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  protected onSuccess(data: any | null, headers: HttpHeaders, page: number): void {
    this.page.totalElements = Number(headers.get('X-Total-Count'));
    this.page.pageNumber = page || 0;
    this.profiles = data || [];
  }

  new() {
    this.sessionStorageService.store('profileFilter', this.data);
    this.sessionStorageService.store('profilePageInfo', this.page);
    this.router.navigate([`/pages/dynamic-config/profile/new`]);
  }

  edit(event) {
    this.sessionStorageService.store('profileFilter', this.data);
    this.sessionStorageService.store('profilePageInfo', this.page);
    this.router.navigate([`/pages/dynamic-config/profile/edit/${event.id}`]);
  }

  delete(row: any) {
    const ref = this.dialogService.open(ConfirmDialogComponent, {
      autoFocus: true,
      context: {
        message: this.translate.instant('profile.confirm.delete')
      },
    });
    ref.onClose.subscribe(res => {
      if (res) {
        this.serviceProfile.delete(row.id).subscribe(
          () => {
            this.setPage(this.page);
            const iconConfig: NbIconConfig = {icon: 'checkmark-outline', pack: 'eva'};
            this.toastrService.primary(this.translate.instant('profile.success.delete'), this.translate.instant('profile.notification'), iconConfig)
          },
          (error) => {
            const iconConfig: NbIconConfig = {icon: 'alert-circle-outline', pack: 'eva'};
            this.toastrService.warning(error.error.message, this.translate.instant('profile.notification'), iconConfig)
          }
        );
      }
    });
  }

  clone(row) {
    this.serviceProfile.clone(row.id).subscribe(() => {
        this.setPage(this.page);
        const iconConfig: NbIconConfig = {icon: 'checkmark-outline', pack: 'eva'};
        this.toastrService.primary(this.translate.instant('profile.success.clone'), this.translate.instant('profile.notification'), iconConfig)
      },
      (errors) => {
        const iconConfig: NbIconConfig = {icon: 'alert-circle-outline', pack: 'eva'};
        this.toastrService.warning(errors.error.message, this.translate.instant('profile.notification'), iconConfig)
      }
    );
  }

  deleteMultiple() {
    const ref = this.dialogService.open(ConfirmDialogComponent, {
      autoFocus: true,
      context: {
        message: this.translate.instant('profile.confirm.delete')
      },
    });
    const ids = this.selected.map(e => e.id)
    ref.onClose.subscribe(res => {
      if (res) {
        this.serviceProfile.deleteAll(ids).subscribe(
          () => {
            this.setPage(this.page);
            const iconConfig: NbIconConfig = {icon: 'checkmark-outline', pack: 'eva'};
            this.toastrService.primary(this.translate.instant('profile.success.delete'), this.translate.instant('profile.notification'), iconConfig)
          },
          (error) => {
            const iconConfig: NbIconConfig = {icon: 'alert-circle-outline', pack: 'eva'};
            this.toastrService.warning(error.error.message, this.translate.instant('profile.notification'), iconConfig)
          }
        );
      }
    });
  }
}
