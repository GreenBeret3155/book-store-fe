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
  selector: 'ngx-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']
})
export class ChatDialogComponent implements OnInit, OnDestroy {
  @Input() chatRoom: ChatRoomModel;
  @Input() userInfo: UserModel;
  @Output() clickCloseButtonEvent: EventEmitter<any> = new EventEmitter<any>();
  messages: ChatMessageModel[] = [];
  chatTitle: string = "Nhân viên hỗ trợ";
  isScrollBottom: boolean = true;
  pageMessageCounter: number = 1;
  isLoadedOlderMessageEmpty: boolean = false;
  constructor(private localStorage: LocalStorageService,
    private sessionStorage: SessionStorageService,
    private chatService: ChatService) { }

  ngOnInit() {
    this.getConversationAndConnectWs()
  }

  ngOnDestroy(): void {
    this.disconnect();
  }

  ngAfterViewInit(): void {
    fromEvent(Array.from(document.getElementsByClassName('scrollable')).slice(-1)[0], 'scroll')
      .subscribe((e: Event) => {
        let oldmessref = document.getElementsByTagName('nb-chat-message')[0] as HTMLElement | null
        if (!oldmessref) return;
        if (!(e.target as HTMLElement).scrollTop && !this.isLoadedOlderMessageEmpty) {
          this.chatService.getConversation({
            page: this.pageMessageCounter,
            size: 20
          }).subscribe((response) => {            
            if (response.body && response.body.length) {
              this.isScrollBottom = false;
              this.loadMessages(response.body);
              this.pageMessageCounter++;
              (e.target as HTMLElement).scrollTop = oldmessref.offsetTop;
            } else {
              this.isLoadedOlderMessageEmpty = true;
            }
          })
        }
      });
  }
  onClickCloseButton(){
    this.clickCloseButtonEvent.emit(1);
  }

  disabled = true;
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


  getConversationAndConnectWs() {
    this.chatService.getConversation({
      page: 0,
      size: 20
    }).subscribe((response) => {
      this.loadMessages(response.body);
      this.connect();
    })
  }
  sendMessage(event: any) {
    this.sendMessageToTopic(event)
  }

  sendMessageToTopic(event) {
    this.stompClient.send(
      '/app/chat',
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

  loadMessages(messages: ChatMessageReceiveModel[]) {
    let tranformed: ChatMessageModel[] = [];
    tranformed = this.chatService.handleReceiveMessages(messages, this.userInfo);
    this.chatService.sortChatMessageModel(tranformed);
    this.messages = [...tranformed, ...this.messages];
  }
}
