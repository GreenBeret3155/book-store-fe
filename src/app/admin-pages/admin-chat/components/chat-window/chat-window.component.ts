import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { environment } from '../../../../../environments/environment';
import { ChatMessageModel, ChatMessageReceiveModel } from '../../../../shared/model/chat-message.model';
import { ChatRoomModel } from '../../../../shared/model/chat-room.model';
import { UserModel } from '../../../../shared/model/user.model';
import { ChatService } from '../../../../shared/services/chat.service';
import * as SockJS from 'sockjs-client';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.state';
import { fromEvent, Observable } from 'rxjs';

@Component({
  selector: 'ngx-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('scrollable', { static: false }) scrollable: ElementRef;

  @Input() chatRoom: ChatRoomModel;
  @Input() userInfo: UserModel;
  private stompClient = null;
  messages: ChatMessageModel[] = [];
  chatTitle: string = "Client";
  currentUser: any;
  userInfoStore: Observable<UserModel>;
  pageMessageCounter: number = 1;
  isScrollBottom: boolean = true;
  isLoadedOlderMessageEmpty: boolean = false;
  constructor(private localStorage: LocalStorageService,
    private sessionStorage: SessionStorageService,
    private chatService: ChatService,
    private store: Store<AppState>) {
    this.userInfoStore = this.store.select('user')
  }

  ngOnInit() {
    this.userInfoStore.subscribe((userInfo: UserModel) => {
      this.currentUser = userInfo;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.chatRoom && changes.chatRoom.currentValue != null) {
      this.disconnect();
      this.getConversationAndConnectWs();
      this.chatTitle = this.userInfo.firstName + ' ' + this.userInfo.lastName;
    }
  }

  ngAfterViewInit(): void {
    fromEvent(Array.from(document.getElementsByClassName('scrollable')).slice(-1)[0], 'scroll')
      .subscribe((e: Event) => {
        let oldmessref = document.getElementsByTagName('nb-chat-message')[0] as HTMLElement | null
        if (!oldmessref) return;
        if (!(e.target as HTMLElement).scrollTop && !this.isLoadedOlderMessageEmpty) {
          this.chatService.getConversationByRoomId(this.chatRoom.id, {
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

  // ws
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
  }


  getConversationAndConnectWs() {
    this.messages = [];
    this.chatService.getConversationByRoomId(this.chatRoom.id, {
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
        "senderId": this.currentUser.id,
        "contentType": 1,
        "content": event.message
      })
    );
  }

  receiveMessageFromTopic(event: any) {
    const currentMessage: ChatMessageReceiveModel = JSON.parse(new TextDecoder().decode(event._binaryBody));
    const newMessage: ChatMessageModel = this.chatService.handleReceiveMessage(currentMessage, this.currentUser, this.userInfo);
    this.messages.push(newMessage);
  }

  loadMessages(messages: ChatMessageReceiveModel[]) {
    let tranformed: ChatMessageModel[] = [];
    tranformed = this.chatService.handleReceiveMessages(messages, this.currentUser, this.userInfo);
    this.chatService.sortChatMessageModel(tranformed);
    this.messages = [...tranformed, ...this.messages];
  }
}
