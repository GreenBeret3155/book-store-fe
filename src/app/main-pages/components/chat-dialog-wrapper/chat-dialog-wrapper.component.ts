import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../app.state';
import { ChatRoomModel } from '../../../shared/model/chat-room.model';
import { UserModel } from '../../../shared/model/user.model';
import { ChatService } from '../../../shared/services/chat.service';
import { ChatDialogComponent } from '../chat-dialog/chat-dialog.component';

@Component({
  selector: 'ngx-chat-dialog-wrapper',
  templateUrl: './chat-dialog-wrapper.component.html',
  styleUrls: ['./chat-dialog-wrapper.component.scss']
})
export class ChatDialogWrapperComponent implements OnInit {

  userInfo: UserModel;
  userInfoStore :Observable<UserModel>;
  isShowChatDialog: boolean = false;
  isShowChatBotDialog: boolean = false;
  chatRoom : ChatRoomModel
  messages: any[];
  position:string = '16px'
  position2:string = '300px'
  constructor(
    private chatService: ChatService,
    private store: Store<AppState>
  ) {
    this.userInfoStore = this.store.select('user');
  }

  ngOnInit() {
    this.userInfoStore.subscribe((userInfo: UserModel) => {
      this.userInfo = userInfo;
    })
  }

  onClickChatButton() {
    this.chatService.getRoomId().subscribe((response) => {
      this.chatRoom = response.body
      if(this.chatRoom.id && this.userInfo && this.userInfo.id){
        this.isShowChatBotDialog = false;
        this.isShowChatDialog = !this.isShowChatDialog;
        this.position2 = '1525px'
      }
    },()=>{
      console.log("error get room");
    })
  }

  onClickChatBotButton(){
    this.chatService.getRoomId().subscribe((response) => {
      this.chatRoom = response.body
      if(this.chatRoom.id && this.userInfo && this.userInfo.id){
        this.isShowChatDialog = false;
        this.isShowChatBotDialog = !this.isShowChatBotDialog;
        this.position = '1525px'
      }
    },()=>{
      console.log("error get room");
    })
  }

  handleClickCloseButtonEvent($event){
    this.isShowChatDialog = !this.isShowChatDialog
    this.resetPosition()
  }

  handleClickCloseButtonEvent2(){
    this.isShowChatBotDialog = !this.isShowChatBotDialog
    this.resetPosition()
  }

  resetPosition(){
    this.position = '16px';
    this.position2 = '300px';
  }

}
