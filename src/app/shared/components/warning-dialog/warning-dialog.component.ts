import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef, NbDialogService, NbIconConfig, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChartConfigService} from '../../services/chart-config.service';
import {AccountService} from '../../../@core/auth/account.service';
import {Subject} from 'rxjs';
import {NbMenuService} from '../../../menu-custom/menu.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../@core/user/user.service';
import {ToasterService} from 'angular2-toaster';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'ngx-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.scss']
})
export class WarningDialogComponent implements OnInit {
  users: any[] = [];
  warningForm: FormGroup =  this.fb.group({
    userIdSent: [null],
    listuserIdRecieved: [null, Validators.required],
    title: [''],
    content: [''],
    keyword: [''],
    image: [null],
    fileAttach: [null],
    screenId: [null],
    isSendEmail: [null]
  });
  selectedUser: any[] = [];
  userList: any[] = [];
  previewSignsrc: any;
  currentUser: any;
  constructor(public ref: NbDialogRef<WarningDialogComponent>,
              public fb: FormBuilder,
              public chartConfigService: ChartConfigService,
              public toastrService: NbToastrService,
              public accountService: AccountService,
              public dialogService: NbDialogService,
              public menuService: NbMenuService,
              public toasterService: ToasterService,
              public activatedRoute: ActivatedRoute,
              public router: Router,
              public userService: UserService,
  ) { }
  @Input() imageChart: any;
  @Input() chartId: any
  @Input() screenId: any;
  messages: any[] = [];
  receiveUser: any;
  active: boolean;
  page = 0;
  pageUser = 0;
  keyword: any;
  destroy$: any = new Subject();
  ngOnInit() {
    // if (this.imageChart)
      // this.previewSignsrc = URL.createObjectURL(this.imageChart)
    this.chartConfigService.getUserReceive(this.chartId).subscribe(res => {
      const data = res ? res.map(user => {
        return  Object.assign(user, {selectedUser: false})
      }) : [];
      this.selectedUser = data
      this.searchUser('', this.selectedUser);
    });
    this.accountService.identity().subscribe((res: any) => {
      this.currentUser = res
    })
  }
  // getUsers(keyword?: any, isRes?: any, page?: any) {
  isSendEmail: any;
  send() {
    const formData = new FormData();
    const userIdList = this.selectedUser.map(res => res.userId)
    const title = 'Cảnh báo điều hành từ ' + this.currentUser.login;
    const isSendEmail = this.isSendEmail ? 1 : 0
    formData.append('userIdSent', this.currentUser.id);
    formData.append('receivedUserIds', userIdList.join(','));
    formData.append('content', this.warningForm.value.content);
    if (this.screenId)
    formData.append('screenId', this.screenId);
    formData.append('title', title);
    formData.append('isSendEmail', isSendEmail + '');
    if (this.imageChart)
      formData.append('image', this.imageChart, 'image.png');
    this.chartConfigService.sendWarning(formData).subscribe((res: any) => {
      if (res && this.isSendEmail) {
        const content = '<p>' + this.warningForm.value.content + '</p>\n' +
          `<img src="${environment.apiUrl}/notification/show-image?path=` + res.imagePath + '"/>'
        this.chartConfigService.sendEmail({
          userIds: userIdList,
          content: content,
          subject: title,
          notifyId: res.id,
          isRepeat: 0,
          source: `DASHBOARD`
        }).subscribe(data => {
        })
      }
      this.ref.close('success')
    }),
      (error) => {
        this.toasterService.pop('warning', 'Thông báo', error.error.message)
        // const iconConfig: NbIconConfig = {icon: 'alert-circle-outline', pack: 'eva'};
        // this.toastrService.warning(error.error.message, 'Thông báo', iconConfig)
      }
  }

  addUser(userSelected, selected) {
    console.log(userSelected);
    console.log(selected);
    if (selected) {
        this.selectedUser.push(userSelected)
        this.selectedUser = [...this.selectedUser]
    }
    if (!selected) {
      this.selectedUser = this.selectedUser.filter(data => {
        if (data.userId !== userSelected.userId) {
          return data
        }
      })
    }

  }

  deleteUserSelect(event) {
    this.users.forEach(res => {
      if (res.userId === event.value.userId) {
        res.selectedUser = false
      }
    })
  }

  searchUser(keyword?: any, selectedUserList?: any[]) {
    let host = window.location.href;
    host = host.replace(this.router.url, '');
    this.userService.getUserChat({
      page: this.pageUser,
      keyword: keyword,
      size: 100
    }).subscribe(res => {
      if (selectedUserList || this.selectedUser) {
      const userIdList = selectedUserList ? selectedUserList.map(user => user.userId) : this.selectedUser.map(user => user.userId);
      const data = res.body.map(e => {
        if (e.userId === this.currentUser.id) {
          e.avatar = host + '/assets/images/bookmark.png'
        } else if (e.avatar) {
          e.avatar = `${environment.apiUrl}/notification/show-image?path=` + e.avatar
        } else {
          e.avatar = host + '/assets/images/user.png'
        }
        if (userIdList.indexOf(e.userId) !== -1) {
          return  Object.assign(e, {selectedUser: true})
        } else {
          return  Object.assign(e, {selectedUser: false})

        }
      });
      this.users = data
      } else {
        this.users = res.body
      }
      this.userList = Object.assign([], res)

    })
    // const data = Object.assign([], this.userList).filter(res => {
    //   if (res.username.includes(keyword)) {
    //     return res
    //   }
    // })
    // this.users = data;
  }
}
