import { Component, Injectable, Input, OnInit, Type } from '@angular/core';
import {Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from '../../../../environments/environment';
import { ChatRoomModel } from '../../../shared/model/chat-room.model';
import { UserModel } from '../../../shared/model/user.model';

@Component({
  selector: 'ngx-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']
})
export class ChatDialogComponent implements OnInit {
  @Input() chatRoom: ChatRoomModel;
  @Input() userInfo: UserModel;
  messages = []
  constructor() { }

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
    console.log(this.chatRoom);
    
    const socket = new SockJS(`${environment.apiWs}/ws`);
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, (frame) => {
      this.setConnected(true);
      console.log('Connected: ' + frame);

      this.stompClient.subscribe(`user/${this.chatRoom.id}/queue/messages`, (content) => {
        console.log(content);
        
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

  // sendName() {
  //   this.stompClient.send(
  //     '/gkz/hello',
  //     {},
  //     JSON.stringify({ 'name': this.name })
  //   );
  // }

  // showGreeting(message) {
  //   this.greetings.push(message);
  // }

}
