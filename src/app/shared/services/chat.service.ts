import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {createRequestOption} from "../util/request-util";
import { ChatMessageModel, ChatMessageReceiveModel } from '../model/chat-message.model';
import { UserModel } from '../model/user.model';

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

  handleReceiveMessage(message: ChatMessageReceiveModel, currentUser: UserModel): ChatMessageModel{
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

    return new ChatMessageModel(message.content, message.createdAt, isReply, contentType, currentUser);
  }
}
