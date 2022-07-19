import { ChatMessageModel } from "./chat-message.model";
import { ChatRoomModel } from "./chat-room.model";
import { UserModel } from "./user.model"

export interface INotificationModel {
    type?: number
    room?: ChatRoomModel
    message?: ChatMessageModel
  }
  
  export class NotificationModel implements INotificationModel {
    constructor(public type?: number,
      public room?: ChatRoomModel,
      public message?: ChatMessageModel,) {
    }
  }
  