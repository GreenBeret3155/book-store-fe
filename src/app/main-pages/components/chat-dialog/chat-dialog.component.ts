import { Component, Injectable, Input, OnInit } from '@angular/core';
import {Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from '../../../../environments/environment';
import { ChatRoomModel } from '../../../shared/model/chat-room.model';

@Component({
  selector: 'ngx-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']
})
export class ChatDialogComponent implements OnInit {
  @Input() chatRoom: ChatRoomModel;
  constructor() { }

  ngOnInit() {
  }

  // title = 'grokonez';
  // description = 'Angular-WebSocket Demo';

  // greetings: string[] = [];
  // disabled = true;
  // name: string;
  // private stompClient = null;

  // setConnected(connected: boolean) {
  //   this.disabled = !connected;

  //   if (connected) {
  //     this.greetings = [];
  //   }
  // }

  // connect() {
  //   const socket = new SockJS(`${environment.apiUrl}/ws`);
  //   this.stompClient = Stomp.over(socket);

  //   this.stompClient.connect({}, (frame) => {
  //     this.setConnected(true);
  //     console.log('Connected: ' + frame);

  //     this.stompClient.subscribe(`user/${this.chatRoom.id}/topic/hi`, function (hello) {
  //       this.showGreeting(JSON.parse(hello.body).greeting);
  //     });
  //   });
  // }

  // disconnect() {
  //   if (this.stompClient != null) {
  //     this.stompClient.disconnect();
  //   }

  //   this.setConnected(false);
  //   console.log('Disconnected!');
  // }

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
