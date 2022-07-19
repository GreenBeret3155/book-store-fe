import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbMenuService, NbToastrService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { AccountService } from '../../@core/auth/account.service';
import { AppState } from '../../app.state';
import { ChatRoomModel } from '../../shared/model/chat-room.model';
import { UserModel } from '../../shared/model/user.model';
import { ChatService } from '../../shared/services/chat.service';
import * as SockJS from 'sockjs-client';
import { environment } from '../../../environments/environment';
import { Stomp } from '@stomp/stompjs';
import { NotificationModel } from '../../shared/model/notification-model';
import { NOTIFICATION_TYPE_CONST } from '../../shared/common.constant';

@Component({
  selector: 'ngx-admin-chat',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.scss']
})
export class AdminChatComponent implements OnInit {

  currentUser: any;
  pageUser = 0;
  searchForm: FormGroup = this.fb.group({
    userKeyword: [''],
    messKeyword: ['']
  });
  private stompClient = null;

  chatRoomSelected: ChatRoomModel;
  userInfoSelected: UserModel
  roomSelected: ChatRoomModel
  rooms: ChatRoomModel[] = [];
  showRooms: ChatRoomModel[] = [];
  userInfoStore: Observable<UserModel>;

  constructor(
    private accountService: AccountService,
    private dialogService: NbDialogService,
    private menuService: NbMenuService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private chatService: ChatService,
    private localStorage: LocalStorageService, 
    private sessionStorage: SessionStorageService,
    private store: Store<AppState>) {
      this.userInfoStore = this.store.select('user')
    }

  ngOnInit() {
    this.getCurentUser();
    this.searchForm.valueChanges.subscribe(res => {
      // this.getUsers(res ? res.userKeyword : null, true)
      if(res.userKeyword){
        this.showRooms = this.rooms.filter(e => e.client.login.includes(res.userKeyword));
      } else {
        this.showRooms = this.rooms;
      }
    })
  }

  getCurentUser() {
    // this.accountService.identity().subscribe(
    //   res => {
    //     this.currentUser = res;
    //   }
    // )
    this.userInfoStore.subscribe((userInfo: UserModel) => {
      this.currentUser = userInfo;
      if(this.currentUser){
        this.getRooms();
        this.connect();
      }
    })
  }

  getRooms(){    
    this.chatService.getAllChatRoomsByUser({
      page: this.pageUser,
      size: 10
    }).subscribe(res =>{
      this.rooms = res.body;
      this.showRooms = this.rooms;
      this.roomSelected = this.rooms[0];
    })
  }

  selectRoom($event){
    this.roomSelected = $event;
  }

  loadUserNext(event) {
    // if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
    //   this.pageUser++;
    //   this.getRooms()
    // }
  }


  //ws
  setConnected(connected: boolean) {
    // this.disabled = !connected;

    // if (connected) {
    //   this.greetings = [];
    // }
  }

  connect() {
    console.log("user",this.currentUser);
    
    const token = this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');    
    const socket = new SockJS(`${environment.apiWs}/ws?access_token=${token}`);
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, (frame) => {
      this.setConnected(true);
      this.stompClient.subscribe(`/user/${this.currentUser.id}/notification`, (content) => {
        this.receiveNotificationFromTopic(content);
      });
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
    this.setConnected(false);
  }

  receiveNotificationFromTopic(event: any){
    const currentNotification: NotificationModel = JSON.parse(new TextDecoder().decode(event._binaryBody));
    console.log(currentNotification);
    
    switch (currentNotification.type){
      case NOTIFICATION_TYPE_CONST.NEW_ROOM:
        this.onNotiNewRoom(currentNotification.room)
        break;
      
      case NOTIFICATION_TYPE_CONST.UPDATE_ROOM:
        this.onNotiUpdateRoom(currentNotification.room)
        break;
    }
  }

  onNotiNewRoom(newRoom: ChatRoomModel){
    if(!newRoom.id){
      return ;
    }
    this.chatService.getChatRoomsByRoomId(newRoom.id).subscribe(res => {
      const room: ChatRoomModel = res.body;
      // if(!room.lastMessageContent || !room.lastMessageTime)
      this.rooms.push(res.body)
    })
  }

  onNotiUpdateRoom(updateRoom: ChatRoomModel){
    console.log([...this.rooms]);
    
    this.rooms.forEach(e => {
      if(e.id == updateRoom.id){
        e.lastMessageContent = updateRoom.lastMessageContent;
        e.lastMessageTime = updateRoom.lastMessageTime;
      }
    })

    console.log([...this.rooms]);
  }
}
