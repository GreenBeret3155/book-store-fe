import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {createRequestOption} from "../util/request-util";
import { ChatMessageModel, ChatMessageReceiveModel } from '../model/chat-message.model';
import { UserModel } from '../model/user.model';
import { BOT_USER } from '../user.constant';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient) {
  }

  getRoomId() {
    return this.http.get<any>(`${environment.apiUrl}/room`, {
      observe: 'response'
    });
  }

  getConversation(req?) {
    const options = createRequestOption(req);
    return this.http.get<any>(`${environment.apiUrl}/room/conversation`, {
      params: options,
      observe: 'response'
    });
  }

  sortChatMessageModel(messages: ChatMessageModel[]) : void{
    messages.sort((a: ChatMessageModel, b: ChatMessageModel) => a.id > b.id ? 1 : -1);
  }

  handleReceiveMessage(message: ChatMessageReceiveModel, currentUser: UserModel): ChatMessageModel{
    if(message.senderId == -99) currentUser = BOT_USER;
    let contentType : string = "text";
    switch (message.contentType){
      case 1:
        contentType = "text";
        break;
      
      case 2:
        contentType = "file";
        break;
    }
    const isReply: boolean = message.senderId == currentUser.id ;

    return new ChatMessageModel(message.id, message.content, message.createdAt, isReply, contentType, currentUser);
  }

  handleReceiveMessages(messages: ChatMessageReceiveModel[], currentUser: UserModel): ChatMessageModel[]{
    const tranformed : ChatMessageModel[] = messages.map(e => this.handleReceiveMessage(e, currentUser));
    return tranformed;
  }
}
