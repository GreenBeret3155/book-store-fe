import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Page} from '../../../@core/model/page.model';
import {UserService} from '../../../@core/user/user.service';
import {Router} from '@angular/router';
import {HttpHeaders} from '@angular/common/http';
import {IUser, User} from '../../../@core/user/user.model';
import {NbDialogService, NbIconConfig} from '@nebular/theme';
import {ConfirmDialogComponent} from '../../../share-lib-module/confirm-dialog/confirm-dialog.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CategoryId} from '../../../shared/common.constant';
import {CatItemServiceService} from '../../../shared/services/cat-item-service.service';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {TranslateService} from '@ngx-translate/core';
import {UserConfigUpdateComponent} from '../user-config-update/user-config-update.component';
import {DashboardService} from '../../../shared/services/dashboard.service';

@Component({
  selector: 'ngx-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.scss']
})
export class UserConfigComponent implements OnInit, AfterViewInit {

  userUpdateMultiple: any[] = [];
  selected: any[] = [];
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  page = new Page();
  users?: User[] = new Array<User>();
  checkboxColumns = {name: '', prop: 'checkbox', flexGrow: 0.2};
  columns = [
    {name: 'user.column.index', prop: 'index', flexGrow: 0.3},
    {name: 'user.column.account', prop: 'login', flexGrow: 1},
    {name: 'user.column.email', prop: 'email', flexGrow: 1},
    {name: 'user.column.status', prop: 'activated', flexGrow: 1},
    {name: 'user.column.phoneNumber', prop: 'phone', flexGrow: 1},
    {name: 'user.column.authoritiesName', prop: 'authoritiesName', flexGrow: 1},
    {name: 'user.column.domainCode', prop: 'domainCode', flexGrow: 1},
    {name: 'user.column.createDate', prop: 'createdDate', flexGrow: 1},
    {name: 'user.column.active', prop: 'action_btn', flexGrow: 1}
  ];
  currentTheme: any = 'dark';

  data: IUser[];
  userForm: FormGroup = this.fb.group({
    authorities: [null],
    domains: [null],
    keyword: [null]
  });
  authorities: any[];
  domainData: any[];
  toasterConfig: ToasterConfig = new ToasterConfig({
    animation: 'flyRight',
    newestOnTop: true
  });

  constructor(public userService: UserService,
              private catItemServiceService: CatItemServiceService,
              private dialogService: NbDialogService,
              private fb: FormBuilder,
              private toasterService: ToasterService,
              private translate: TranslateService,
              private dashboardService: DashboardService,
              private router: Router) {
    this.page.pageNumber = 0;
    this.page.size = 10;
  }

  ngOnInit() {
    this.dashboardService.currentTheme.subscribe(e => {
      if (e && this.currentTheme !== e) {
        this.currentTheme = e
      }
    })
    this.userService.authorities().subscribe(authorities => {
      this.authorities = authorities
    });
    this.catItemServiceService.fetch(CategoryId.DOMAIN).subscribe(domains => {
      this.domainData = domains
    });
    this.setPage(this.page);
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      document.getElementById('keywordId').focus();
    }, 100);
  }
  search() {
    this.setPage({offset: 0});
  }

  setPage(pageInfo) {
    const pageToLoad: number = pageInfo.offset;
    this.userService.query({
      page: pageToLoad,
      size: this.page.size
    }, this.userForm.value).subscribe(res => this.onSuccess(res.body, res.headers, pageToLoad));
  }

  protected onSuccess(data: any | null, headers: HttpHeaders, page: number): void {
    this.page.totalElements = Number(headers.get('X-Total-Count'));
    this.page.pageNumber = page || 0;
    this.users = data || [];
    this.changeCheckboxStatus();
    this.selected = []
  }


  new() {
    const dialogNew = this.dialogService.open(UserConfigUpdateComponent, {
      hasBackdrop: true,
      closeOnBackdropClick: false
    });
    dialogNew.onClose.subscribe(data => {
      if (data.result !== undefined &&  'complete' === data.result) {
        this.search();
      }
    });
  }
  // edit(event) {
  //   this.router.navigate([`/pages/user-management/user/${event.login}/edit`]);
  // }
  edit(row) {
    const dialogUpdate = this.dialogService.open(UserConfigUpdateComponent, {
      backdropClass: 'dark-backdrop',
      context: {
        user: row
      },
      hasBackdrop: true,
      closeOnBackdropClick: false
    });
    dialogUpdate.onClose.subscribe(data => {
      if (data.result === 'complete') {
        this.search();
      }
    });
  }

  resetPassword(user) {
    const dialog = this.dialogService.open(ConfirmDialogComponent, {
      autoFocus: true,
      context: {
        message: 'Bạn có chắc chắn reset mật khẩu người dùng này không?'
      },
    });
    dialog.onClose.subscribe(res => {
      if (res) {
        this.userService.resetPass(user).subscribe( () => {
          this.toasterService.pop('success', 'Thông báo', this.translate.instant('requestPassword.requestPasswordSuccess'));
          this.setPage(this.page);
        })
      }
    });
  }

  setActive(user, isActivated) {
    this.dialogService.open(ConfirmDialogComponent, {
      autoFocus: true,
      context: {
        message: 'Bạn có chắc chắn muốn chuyển trạng thái của người dùng không?'
      },
    }).onClose.subscribe(res => this.onComplete(res, user, isActivated));
  }
  onComplete(res, user, isActivated) {
    if (res) {
      user.activated = isActivated;
      this.userService.updateStatus(user).subscribe(
        () => {
          this.toasterService.pop('success', 'Thông báo', this.translate.instant('user.changeStatusSuccess'));
          this.setPage(this.page);
        }
      );
    }
  }

  deleteMultiple() {
    const ref = this.dialogService.open(ConfirmDialogComponent, {
      autoFocus: true,
      context: {
        message: 'Bạn có chắc chắn muốn chuyển trạng thái của người dùng không?'
      },
    });
    ref.onClose.subscribe(res => {
      if (res) {
        const arr = this.selected;
        for(let i = 0; i < this.selected.length; i++){
          switch (this.selected[i].activated) {
            case true:
              arr[i].activated = false;
              break;
            case false:
              arr[i].activated = true;
              break;
          }
          this.userUpdateMultiple = arr;
        }
        this.userService.updateStatusMultiple(this.userUpdateMultiple).subscribe(
          () => {
            this.toasterService.pop('success', 'Thông báo', this.translate.instant('user.changeStatusSuccess'));
            this.setPage(this.page);
            // this.selected = []
          },
          (error) => {
            alert(error.error.title);
          }
        );
      }
    });
  }
  changeCheckboxStatus(){
    if (this.page.totalElements === 0) {
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
}
