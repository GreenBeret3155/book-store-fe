import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ChatRoomModel } from '../../../shared/model/chat-room.model';
import { ChatService } from '../../../shared/services/chat.service';
import { ChatDialogComponent } from '../chat-dialog/chat-dialog.component';

@Component({
  selector: 'ngx-chat-dialog-wrapper',
  templateUrl: './chat-dialog-wrapper.component.html',
  styleUrls: ['./chat-dialog-wrapper.component.scss']
})
export class ChatDialogWrapperComponent implements OnInit {

  isShowChatDialog: boolean = false;
  chatRoom : ChatRoomModel
  messages: any[];
  constructor(
    private chatService: ChatService,
  ) { }

  ngOnInit() {
  }

  onClickChatButton() {
    this.chatService.getRoomId().subscribe((response) => {
      this.chatRoom = response.body
      if(this.chatRoom.id){
        this.isShowChatDialog = !this.isShowChatDialog
      }
    },()=>{
      console.log("error get room");
      
    })
  }

  sendMessage(message: any){
    console.log(message);
    
  }

}
