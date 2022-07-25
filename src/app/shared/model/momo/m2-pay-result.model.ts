export interface IM2PayResult {
  partnerCode?: string,
  orderId?: number,
  requestId?: string,
  amount?: number,
  orderInfo?: string,
  orderType?: string,
  transId?: number,
  resultCode?: number,
  message?: string,
  payType?: string,
  responseTime?: number,
  extraData?: string,
  signature?: string,
}

export class M2PayResult implements IM2PayResult {
  constructor(public partnerCode?: string,
    public orderId?: number,
    public requestId?: string,
    public amount?: number,
    public orderInfo?: string,
    public orderType?: string,
    public transId?: number,
    public resultCode?: number,
    public message?: string,
    public payType?: string,
    public responseTime?: number,
    public extraData?: string,
    public signature?: string) {
  }
}
