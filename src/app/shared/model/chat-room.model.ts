import { UserModel } from "./user.model"

export interface IChatRoomModel {
  id?: number
  uuid?: string
  lastMessageTime?: Date
  lastMessageContent?: string
  listUserId?: number[]
  client?: UserModel
  }
  
  export class ChatRoomModel implements IChatRoomModel {
    constructor(public id?: number,
                public uuid?: string,
                public lastMessageTime?: Date,
                public lastMessageContent?: string,
                public listUserId?: number[],
                public client?: UserModel,) {
    }
  }
  