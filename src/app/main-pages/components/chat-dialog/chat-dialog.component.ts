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
  messages : ChatMessageModel[] = [];
  constructor(private localStorage: LocalStorageService, 
    private sessionStorage: SessionStorageService,
    private chatService: ChatService) { }

  ngOnInit() {
    this.connect();
  }

  title = 'grokonez';
  description = 'Angular-WebSocket Demo';

  greetings: string[] = [];
  disabled = true;
  name: string;
  private stompClient = null;

  setConnected(connected: boolean) {
    // this.disabled = !connected;

    // if (connected) {
    //   this.greetings = [];
    // }
  }

  connect() {
    const token = this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');    
    const socket = new SockJS(`${environment.apiWs}/ws?access_token=${token}`);
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, (frame) => {
      this.setConnected(true);
      console.log('Connected: ' + frame);

      this.stompClient.subscribe(`/user/${this.chatRoom.id}/queue/messages`, (content) => {
        this.receiveMessageFromTopic(content);
      });
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }

    this.setConnected(false);
    console.log('Disconnected!');
  }

  // showGreeting(message) {
  //   this.greetings.push(message);
  // }
  sendMessage(event: any) {
    // console.log(event);
    // const files = !event.files ? [] : event.files.map((file) => {
    //   return {
    //     url: file.src,
    //     type: file.type,
    //     icon: 'file-text-outline',
    //   };
    // });

    // this.messages.push({
    //   text: event.message,
    //   date: new Date(),
    //   reply: true,
    //   type: files.length ? 'file' : 'text',
    //   user: {
    //     lastName: 'Jonh Doe',
    //     avatar: 'https://i.gifer.com/no.gif',
    //   },
    // });
    this.sendMessageToTopic(event)
  }

  sendMessageToTopic(event) {
    this.stompClient.send(
      '/app/chat',
      {},
      JSON.stringify({
        "chatRoomId":this.chatRoom.id,
        "senderId":this.userInfo.id,
        "contentType":1,
        "content": event.message
      })
    );
  }

  receiveMessageFromTopic(event: any){
    console.log(event);
    const currentMessage: ChatMessageReceiveModel = JSON.parse(new TextDecoder().decode(event._binaryBody));
    console.log("1",currentMessage);
    const newMessage: ChatMessageModel = this.chatService.handleReceiveMessage(currentMessage, this.userInfo);
    console.log("2", newMessage);
    this.messages.push(newMessage);
  }
}
