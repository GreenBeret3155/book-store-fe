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
  chatRoom : ChatRoomModel
  messages: any[];
  constructor(
    private chatService: ChatService,
    private store: Store<AppState>
  ) {
    this.userInfoStore = this.store.select('user');
  }

  ngOnInit() {
    this.userInfoStore.subscribe((userInfo: UserModel) => {
      console.log(userInfo);
      this.userInfo = userInfo;
    })
  }

  onClickChatButton() {
    this.chatService.getRoomId().subscribe((response) => {
      this.chatRoom = response.body
      if(this.chatRoom.id && this.userInfo && this.userInfo.id){
        this.isShowChatDialog = !this.isShowChatDialog
      }
    },()=>{
      console.log("error get room");
    })
  }

  handleClickCloseButtonEvent($event){
    this.isShowChatDialog = !this.isShowChatDialog
  }

  sendMessage(message: any){
    console.log(message);
    
  }

}
