export interface IChatRoomModel {
  id?: number
  uuid?: string
  }
  
  export class ChatRoomModel implements IChatRoomModel {
    constructor(public id?: number,
                public uuid?: string,) {
    }
  }
  