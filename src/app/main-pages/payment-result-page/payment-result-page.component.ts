import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwIfAlreadyLoaded } from '../../@core/module-import-guard';
import { M2PayResult } from '../../shared/model/momo/m2-pay-result.model';
import { OrderService } from '../../shared/services/main/order.service';

@Component({
  selector: 'ngx-payment-result-page',
  templateUrl: './payment-result-page.component.html',
  styleUrls: ['./payment-result-page.component.scss']
})
export class PaymentResultPageComponent implements OnInit {

  public partnerCode?: string;
  public orderId?: number;
  public requestId?: string;
  public amount?: number;
  public orderInfo?: string;
  public orderType?: string;
  public transId?: number;
  public resultCode?: number;
  public message?: string;
  public payType?: string;
  public responseTime?: number;
  public extraData?: string;
  public signature?: string;
  title: string = "Đang xử lý giao dịch";
  result: any;
  isLoading: boolean = true;
  secondsCounter: number = 10;
  detailLink:string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService) { }

  ngOnInit() {
    this.getResultParamsMomo();    
    this.detailLink = `/main-pages/order-detail/${this.orderId}`
    this.orderService.checkTransaction(new M2PayResult(this.partnerCode,this.orderId,this.requestId,this.amount,this.orderInfo,this.orderType,this.transId,this.resultCode,this.message,this.payType,this.responseTime,this.extraData,this.signature)).subscribe(res => {
      this.result = res.body 
      this.result.responseTime = new Date(this.result.responseTime)
      setInterval(() => {
        this.secondsCounter--;
        if(!this.secondsCounter){
          this.router.navigate([this.detailLink])
        }
      }, 1000)
    },error => {
      this.result = error.body
    });
    
  }

  getResultParamsMomo() {
    this.partnerCode = this.route.snapshot.queryParamMap.get('partnerCode');
    this.orderId = + this.route.snapshot.queryParamMap.get('orderId');
    this.requestId = this.route.snapshot.queryParamMap.get('requestId');
    this.amount = + this.route.snapshot.queryParamMap.get('amount');
    this.orderInfo = this.route.snapshot.queryParamMap.get('orderInfo');
    this.orderType = this.route.snapshot.queryParamMap.get('orderType');
    this.transId = + this.route.snapshot.queryParamMap.get('transId');
    this.resultCode = + this.route.snapshot.queryParamMap.get('resultCode');
    this.message = this.route.snapshot.queryParamMap.get('message');
    this.payType = this.route.snapshot.queryParamMap.get('payType');
    this.responseTime = + this.route.snapshot.queryParamMap.get('responseTime');
    this.extraData = this.route.snapshot.queryParamMap.get('extraData');
    this.signature = this.route.snapshot.queryParamMap.get('signature');
  }

  // getMessageResult(){
  //   if(this.result.)
  // }

}
