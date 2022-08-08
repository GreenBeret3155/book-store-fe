import { Component, EventEmitter, Injectable, Input, OnDestroy, OnInit, Output, Type } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { fromEvent } from 'rxjs';
import * as SockJS from 'sockjs-client';
import { environment } from '../../../../environments/environment';
import { ChatMessageModel, ChatMessageReceiveModel } from '../../../shared/model/chat-message.model';
import { ChatRoomModel } from '../../../shared/model/chat-room.model';
import { UserModel } from '../../../shared/model/user.model';
import { ChatService } from '../../../shared/services/chat.service';

@Component({
  selector: 'ngx-chat-bot-dialog',
  templateUrl: './chat-bot-dialog.component.html',
  styleUrls: ['./chat-bot-dialog.component.scss']
})
export class ChatBotDialogComponent implements OnInit {

  @Input() chatRoom: ChatRoomModel;
  @Input() userInfo: UserModel;
  @Output() clickCloseButtonEvent: EventEmitter<any> = new EventEmitter<any>();
  messages: ChatMessageModel[] = [];
  chatTitle: string = "Trò chuyện cùng Bot";
  constructor(private localStorage: LocalStorageService,
    private sessionStorage: SessionStorageService,
    private chatService: ChatService) { }

  ngOnInit() {
    this.connect();
  }

  ngOnDestroy(): void {
    this.disconnect();
  }

  onClickCloseButton(){
    this.clickCloseButtonEvent.emit(1);
  }

  disabled = true;
  private stompClient = null;

  setConnected(connected: boolean) {
  }

  connect() {
    const token = this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');
    const socket = new SockJS(`${environment.apiWs}/ws?access_token=${token}`);
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, (frame) => {
      this.setConnected(true);
      this.sendMessage({message: '/restart'});
      this.stompClient.subscribe(`/user/${this.chatRoom.id}/bot/messages`, (content) => {
        this.receiveMessageFromTopic(content);
      });
      this.initMessage();
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }

    this.setConnected(false);
    console.log('Disconnected!');
  }

  sendMessage(event: any) {
    this.sendMessageToTopic(event)
  }

  sendMessageToTopic(event) {
    this.stompClient.send(
      '/app/chat-bot',
      {},
      JSON.stringify({
        "chatRoomId": this.chatRoom.id,
        "senderId": this.userInfo.id,
        "contentType": 1,
        "content": event.message
      })
    );
  }

  receiveMessageFromTopic(event: any) {
    console.log(event);
    const currentMessage: ChatMessageReceiveModel = JSON.parse(new TextDecoder().decode(event._binaryBody));
    console.log("1", currentMessage);
    const newMessage: ChatMessageModel = this.chatService.handleReceiveMessage(currentMessage, this.userInfo);
    console.log("2", newMessage);
    this.messages.push(newMessage);
  }

  initMessage(){
    
    this.sendMessage({message: '/help'});
  }
}
