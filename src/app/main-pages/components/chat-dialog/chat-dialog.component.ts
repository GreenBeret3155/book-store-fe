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
    this.getConversationAndConnectWs()
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


  getConversationAndConnectWs(){
    // this.chatService.getConversation({
    //   page: 0,
    //   size: 20
    // }).subscribe((response) => {
    //   let conversation: ChatMessageReceiveModel[] = [];
    //   let tranformed: ChatMessageModel[] = [];
    //   conversation = response.body;
    //   tranformed = this.chatService.handleReceiveMessages(conversation, this.userInfo);
    //   this.chatService.sortChatMessageModel(tranformed);
    //   this.messages = [...tranformed, ...this.messages];
    //   this.connect();
    // })
    this.loadMessages();
  }
  sendMessage(event: any) {
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

  readonly tableData = {
    columns: [ 'First Name', 'Last Name', 'Age' ],
    rows: [
      { firstName: 'Robert', lastName: 'Baratheon', age: 46 },
      { firstName: 'Jaime', lastName: 'Lannister', age: 31 },
    ],
  };

  private loadMessages(): void {
    this.messages = [
      {
        type: 'link',
        text: 'Now you able to use links!',
        customMessageData: {
          href: 'https://akveo.github.io/nebular/',
          text: 'Go to Nebular',
        },
        reply: false,
        date: new Date(),
        user: {
          name: 'Frodo Baggins',
          avatar: 'https://i.gifer.com/no.gif',
        },
      },
      {
        type: 'link',
        customMessageData: {
          href: 'https://akveo.github.io/ngx-admin/',
          text: 'Go to ngx-admin',
        },
        reply: true,
        date: new Date(),
        user: {
          name: 'Meriadoc Brandybuck',
          avatar: 'https://i.gifer.com/no.gif',
        },
      },
      {
        type: 'button',
        customMessageData: 'Click to scroll down',
        reply: false,
        date: new Date(),
        user: {
          name: 'Gimli Gloin',
          avatar: '',
        },
      },
      {
        type: 'table',
        text: `Now let's try to add a table`,
        customMessageData: this.tableData,
        reply: false,
        date: new Date(),
        user: {
          name: 'Fredegar Bolger',
          avatar: 'https://i.gifer.com/no.gif',
        },
      },
      {
        type: 'table',
        text: `And one more table but now in the reply`,
        customMessageData: this.tableData,
        reply: true,
        date: new Date(),
        user: {
          name: 'Fredegar Bolger',
          avatar: 'https://i.gifer.com/no.gif',
        },
      },
    ]
  }
}
