import { Component, Injectable, Input, OnInit, Type } from '@angular/core';
import {Stomp} from '@stomp/stompjs';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import * as SockJS from 'sockjs-client';
import { environment } from '../../../../environments/environment';
import { ChatMessageModel, ChatMessageReceiveModel } from '../../../shared/model/chat-message.model';
import { ChatRoomModel } from '../../../shared/model/chat-room.model';
import { UserModel } from '../../../shared/model/user.model';
import { ChatService } from '../../../shared/services/chat.service';

@Component({
  selector: 'ngx-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']
})
export class ChatDialogComponent implements OnInit {
  @Input() chatRoom: ChatRoomModel;
  @Input() userInfo: UserModel;
  messages : any[] = [];
  chatTitle: string = "Shop Bot";
  constructor(private localStorage: LocalStorageService, 
    private sessionStorage: SessionStorageService,
    private chatService: ChatService) { }

  ngOnInit() {
    // this.getConversationAndConnectWs()
  }

}
