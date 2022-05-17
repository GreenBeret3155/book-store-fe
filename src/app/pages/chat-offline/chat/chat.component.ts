import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../@core/user/user.service';
import {AccountService} from '../../../@core/auth/account.service';
import {ChartConfigService} from '../../../shared/services/chart-config.service';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {UserForwardComponent} from '../../../shared/components/user-forward/user-forward.component';
import {Page} from '../../../@core/model/page.model';
import {filter, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {NbMenuService} from '../../../menu-custom/menu.service';
import {NbContextMenuDirective} from '../../../contex-menu-custom/context-menu.directive';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {UploadDialogComponent} from '../../../shared/components/upload-dialog/upload-dialog.component';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'ngx-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {
  messages: any[] = [];
  Users: any[] = [];
  currentUser: any;
  receiveUser: any;
  selectedMessage: any;
  active: boolean;
  moment = moment;
  page = 0;
  pageUser = 0;
  isLoading: boolean;
  keyword: any;
  showScrollBottom: boolean;
  destroy$: any = new Subject();
  @ViewChild(NbContextMenuDirective, {static: false}) contextMenu: NbContextMenuDirective;
  @ViewChild('chatFormComponent', {static: false}) chatFormComponent: any;
  @ViewChild('chatFile', {static: false}) chatFile: any;
  items = [
    {
      title: 'Chuyển tiếp',
      icon: {
        icon: 'arrow-forward-outline',
        pack: 'eva'
      },
      tag: 'forward'
    },
    {
      title: 'Xóa',
      icon: {
        icon: 'trash-outline',
        pack: 'eva'
      },
      tag: 'delete'
    },
  ]
  canDelete: boolean;

  constructor(protected userService: UserService,
              private accountService: AccountService,
              public chartConfigService: ChartConfigService,
              private dialogService: NbDialogService,
              private menuService: NbMenuService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private toastrService: NbToastrService,
  ) {
    this.scrollBot = true;
    this.showOption = true;
    this.newMess = true;
  }

  ngOnInit() {
    const url = window.location.href;
    this.searchForm.valueChanges.subscribe(res => {
      this.getUsers(res ? res.userKeyword : null, true)
    })
    this.getCurentUser();
    this.getUsers();
  }

  getCurentUser() {
    this.accountService.identity().subscribe(
      res => {
        this.currentUser = res;
      }
    )
  }

  // protected onSuccess(data: any | null, headers: HttpHeaders, page: number): void {
  //   this.page.totalElements = Number(headers.get('X-Total-Count'));
  //   this.page.pageNumber = page || 0;
  //
  // }
  scrollBot: any;
  showOption: any;
  keywordMes: any;
  showSearch: any;
  chatFiles: any;
  newMess: any;
  searchForm: FormGroup = this.fb.group({
    userKeyword: [''],
    messKeyword: ['']
  });

  getUsers(keyword?: any, isRes?: any, page?: any) {
    if (isRes) {
      this.Users = [];
      this.pageUser = 0
    }
    this.userService.getUserChat({
      page: this.pageUser,
      keyword: keyword,
      size: 100
    }).subscribe(res => {
      if (res && res.body) {
        let host = window.location.href;
        host = host.replace(this.router.url, '');
        // console.log(host)
        const userDatas = res.body.filter(data => {
          if (data.userId === this.currentUser.id) {
            data.avatar = host + '/assets/images/bookmark.png'
          } else if (data.avatar) {
            data.avatar = `${environment.apiUrl}/notification/show-image?path=` + data.avatar
          } else {

            data.avatar = host + '/assets/images/user.png'
          }
          return data
        })

        if (keyword) {
          this.Users = userDatas
        } else {
          this.Users = [...this.Users, ...userDatas];
        }
        if (this.pageUser === 0) {
          if (this.receiveUser) {
            this.getMesssage(this.receiveUser, false, true)
          } else {
            this.getMesssage(this.Users[0], false, true)
          }
        }
      }
    })
  }

  sendMessage(text: any, event: any, receivedUser?: any) {
    const iconConfig: any = {icon: 'alert-circle-outline', pack: 'eva'};
    if (event && event.length > 1) {
      this.toastrService.warning('Chỉ cho phép gửi 1 file', 'Thông báo', iconConfig)
    } else {
      const formData = new FormData();
      if (event.length > 0)
        // const blob = new Blob([event.files])
        if (event.length === 1) {
          const blob = new Blob([event[0]])

          if (event[0].type.includes('image/')) {
            // fd.append('icon', blob, event.files[0].name);
            formData.append('image', blob, event[0].name);
          } else {
            formData.append('attachment', blob, event[0].name);
          }
        }
      formData.append('userIdSent', this.currentUser.id);
      formData.append('receivedUserIds', receivedUser.userId);
      if (text)
        formData.append('content', (text && text.message) ? text.message : text);
      this.chartConfigService.sendWarning(formData).subscribe((res: any) => {
        if (res) {
          const that = this;
          const data = [res]
          this.messages = [...this.messages, ...data]
          this.messages = this.converData(this.messages)
          this.scrollBot = false;
          const currentData = Object.assign({}, this.receiveUser)
          currentData.content = res.content
          currentData.timeNewest = res.createDate
          this.receiveUser = {...currentData}
          this.Users = this.Users.map(userData => {
            if (userData.userId === this.receiveUser.userId) {
              userData = this.receiveUser
            }
            return userData
          })
          this.Users = [...this.Users]
          setTimeout(function () {
          that.scrollToBot()
          }, 500)
          // this.getMesssage(receivedUser);
        }
      })
    }
  }

  getMesssage(user: any, scrollBot?: any, reset?: any, keyword?: any) {
    const scrollableDiv = document.querySelector('nb-chat .scrollable');
    if (user) {
      this.showSearch = false;
      this.newMess = true;
      const that = this;

      let readMess = []
      if (reset) {
        this.messages = []
        this.page = 0
      }
      this.receiveUser = user;
      this.selectedMessage = null;

      this.isLoading = true;
      this.userService.getMessage({
        size: 10,
        page: this.page,
        keyword: keyword,
        sentUserId: this.currentUser.id,
        receivedUserIds: user.userId,
        sort: ['createDate,desc']
      }).subscribe(res => {
        if (res) {
          let tempData = Object.assign([], res.body);
          tempData = tempData.filter(data => {
            if (data.notificationUsers) {
              const temp = data.notificationUsers.filter(userMess => {
                if (userMess && (userMess.userIdRecieved === this.currentUser.id || userMess.userIdRecieved === this.receiveUser.userId)) {
                  userMess.isRead = 1
                  // userMess.isNew  = 0
                  return userMess
                }
              });
              data.notificationUsers = temp
              readMess = [...readMess, ...data.notificationUsers]
              return data.notificationUsers
            }
          })
          this.userService.updateReadedMess(readMess).subscribe();
          this.isLoading = false;
          const mess = res.body.reverse()
          this.messages = [...mess, ...this.messages]
          this.messages = this.converData(this.messages)
          if (scrollBot) {
            if (scrollableDiv) {
              scrollableDiv.scroll(0, 2);
            }
          }
        if (reset) {
          setTimeout(function () {
            that.scrollToBot()
          }, 500)
        }
        }
      });
      setTimeout(function () {
        that.Users = that.Users.filter(res => {
          if (res.userId === user.userId) {
            res.numNotifyUnread = 0;
            that.newMess = false;
            that.userService.userMessChange.next(user);
          }
          return res
        })
      }, 3000)
    }
  }

  openOption(message: any) {
    this.showOption = true;
    if (this.selectedMessage && this.selectedMessage.id === message.id) {
      this.selectedMessage = null
    } else {
      this.selectedMessage = message;
    }
    if (this.currentUser.id === message.userIdSent) {
      this.canDelete = true
    } else {
      this.canDelete = false;
    }
  }

  converData(dataConver: any) {
    let host = window.location.href;
    host = host.replace(this.router.url, '');
    const resData = dataConver.map(data => {
      data.baseObject = Object.assign({}, data)
      data.hasDeleteMessage = false;
      data.type = 'text'
      if (data.notificationUsers) {
        const messageUser = data.notificationUsers.map(e => {
          if (e.userIdRecieved === this.receiveUser.userId || e.userIdRecieved === this.currentUser.id) {
            return e
          }
        }).map(userN => {
          if (userN.isDeleted === 1) {
            data.content = 'Tin nhắn đã được xóa';
            data.hasDeleteMessage = true;
            data.files = [];
          }
          return userN
        });
      }
      if (data.hasDeleteMessage) {
        return data
      } else {
        data.files = []
        if (data.imagePath) {
          data.type = 'image'
          data.files.push({
            url: `${environment.apiUrl}/notification/show-image?path=` + data.imagePath,
            type: 'image/jpeg'
          })
        }
        if (data.fileAttachPath) {
          data.type = 'file'
          const fileType = data.fileAttachName.substring(data.fileAttachName.lastIndexOf('.'))
          const fileData = {
            type: 'file',
            url: data.fileAttachPath
          }
          localStorage.setItem(data.id, JSON.stringify(fileData));
          data.files.push({
            url: data.fileAttachPath,
            // url: '',
            type: 'file',
            name: data.fileAttachName || '',
            icon: fileType === '.xlsx' ? 'fa-file-excel-o' : (fileType === '.pdf' ?   'fa-file-pdf-o' : 'fa-file-word-o')
          })
        }
        if (data.screenId) {
          data.url = host + '/pages/screen/' + data.screenId
          // data.files.push({
          //   url: host + '/pages/screen/' + data.screenId,
          //   type: 'file',
          //   icon: 'link-outline'
          // })
        }
      }
      return data
    })
    return resData
  }

  deleteMessage(selectedMessage: any) {
    const data = selectedMessage.notificationUsers.map(e => {
      if (e.userIdRecieved === this.receiveUser.userId || e.userIdRecieved === this.currentUser.id) {
        return e
      }
    }).map(user => {
      if (user && user.isDeleted === 0) {
        console.log(user)
        user.isDeleted = 1
      }
      return user
    });
    this.userService.deleteMessage(data).subscribe(
      res => {
        this.getMesssage(this.receiveUser)
        this.showOption = false;
        this.selectedMessage = null
      }
    )
  }

  ngAfterViewInit() {
    const inputMess: any = document.querySelector('.message-row input');
    inputMess.placeholder = 'Nhập tin nhắn';
    inputMess.style.marginLeft = '50px';
    inputMess.style.borderLeftColor = '#192038';
    inputMess.style.borderRadius = 'unset';
    inputMess.style.boxShadow = 'none';
    inputMess.style.borderRight = 'unset';
    inputMess.style.borderBottom = 'unset';
    inputMess.style.borderTop = 'unset';
    // console.log(document.querySelector('.message-row input'))
    const scrollableDiv = document.querySelector('nb-chat .scrollable');
    const headerChat: any = document.querySelector('nb-chat .header');
    headerChat.style.paddingBottom = '30px'
    if (scrollableDiv) {
      const that = this;
      // scrollableDiv.scroll(0, 100);
      scrollableDiv.addEventListener('scroll', function () {
        if (scrollableDiv.scrollTop === 0) {
          that.page++;
          if (that.keywordMes)
            that.getMesssage(that.receiveUser, true, false, that.keywordMes)
          else that.getMesssage(that.receiveUser, true, false)
        }
        if (scrollableDiv.scrollHeight - scrollableDiv.scrollTop === scrollableDiv.clientHeight) {
          that.showScrollBottom = false
        } else {
          that.showScrollBottom = true
        }
      });
      // setTimeout(function () {
      //   that.scrollToBot()
      // }, 2000)
    }
  }

  openForward(forwardMessage: any) {
    const forwardMessageData = forwardMessage.baseObject
    delete forwardMessageData['notificationUsers']
    const ref = this.dialogService.open(UserForwardComponent, {
      context: {
        users: this.Users
      }
    });
    ref.onClose.subscribe(receiveUsers => {
      this.showOption = false;
      this.selectedMessage = null;
      if (receiveUsers) {
        const receive = receiveUsers.map(e => e.userId)
        // forwardMessageData = {...forwardMessageData , ...{receivedUserIds: receive}};
        // const postData = JSON.stringify(forwardMessageData);
        const formData = new FormData();
        formData.append('receivedUserIds', receive);
        formData.append('content', forwardMessageData.content);
        formData.append('userIdSent', this.currentUser.id);
        if (forwardMessageData.fileAttachName)
          formData.append('fileAttachName', forwardMessageData.fileAttachName);
        if (forwardMessageData.fileAttachPath)
          formData.append('fileAttachPath', forwardMessageData.fileAttachPath);
        if (forwardMessageData.imagePath)
          formData.append('imagePath', forwardMessageData.imagePath);
        if (forwardMessageData.screenId)
          formData.append('screenId', forwardMessageData.screenId);
        // formData.append('jsonData', JSON.stringify({forward: {userName: (forwardMessageData.userIdSent !== this.currentUser.id) ? this.receiveUser.username : this.currentUser.login}}))
        this.chartConfigService.sendWarning(formData).subscribe((res: any) => {
        })
      }
    });
  }

  loadUserNext(event) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      this.pageUser++;
      this.getUsers()
    }
  }

  scrollToBot() {
    const scrollableDiv = document.querySelector('nb-chat .scrollable');
    if (scrollableDiv) {
      const that = this;
      scrollableDiv.scroll(0, scrollableDiv.scrollHeight);
    }
  }
  scrollToTop() {
    const scrollableDiv = document.querySelector('nb-chat .scrollable');
    if (scrollableDiv) {
      const that = this;
      scrollableDiv.scrollTop = 0
    }
  }

  uploadFile(file) {
    const ref = this.dialogService.open(UploadDialogComponent, {
      autoFocus: true,
      context: {
        file: file
      },
    });
    ref.onClose.subscribe((res: any) => {
      this.chatFile.nativeElement.value = null;
      if (res)
        this.sendMessage(res.message, res.file, this.receiveUser)
    })
  }


  refresh() {
    const that = this
    this.getUsers('', true);
    setTimeout(function () {
      const userData = Object.assign([], that.Users).find(e => e.userId === that.receiveUser.userId)
      that.receiveUser = userData
      // that.getMesssage(userData, false, true)
    }, 1500)

  }
}
