import { UserModel } from "./user.model";

export interface IChatMessageModel {
  text?: string,
  date?: Date,
  reply?: boolean,
  type?: string | number,
  user?: UserModel,
}

export class ChatMessageModel implements IChatMessageModel {
  constructor(public text?: string,
    public date?: Date,
    public reply?: boolean,
    public type?: string | number,
    public user?: UserModel,) {
  }
}

export interface IChatMessageReceiveModel {
  chatRoomId?: number,
  senderId?: number,
  contentType?: number,
  content?: string,
  createdAt?: Date
}

export class ChatMessageReceiveModel implements IChatMessageReceiveModel {
  constructor(public chatRoomId?: number,
    public senderId?: number,
    public contentType?: number,
    public content?: string,
    public createdAt?: Date) {
  }
}

