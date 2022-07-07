export interface IOrderInfoModel {
  id?: number;
  userId?: number;
  state?: number;
  name?: string;
  email?: string;
  address?: string;
  phone?: string;
}

export class OrderInfoModel implements IOrderInfoModel {
  constructor(public id?: number,
    public userId?: number,
    public state?: number,
    public name?: string,
    public email?: string,
    public address?: string,
    public phone?: string) {
  }
}
