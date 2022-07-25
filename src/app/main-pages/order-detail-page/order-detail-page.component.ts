import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '../../shared/common.constant';

@Component({
  selector: 'ngx-order-detail-page',
  templateUrl: './order-detail-page.component.html',
  styleUrls: ['./order-detail-page.component.scss']
})
export class OrderDetailPageComponent implements OnInit {

  order: any;
  readonly PAYMENT_TYPE = Constants.PAYMENT_TYPE;
  readonly ORDER_STATE = Constants.ORDER_STATE;
  paymentItem: any = this.PAYMENT_TYPE[0];
  stateString: string = "";
  constructor(public activatedRoute: ActivatedRoute, 
    protected router: Router,) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ objData }) => {
      this.order = objData;
      this.handleItemData();
    });
  }

  handleItemData(){
    this.paymentItem = this.PAYMENT_TYPE.filter(e => e.type == this.order.order.paymentType)[0];
    console.log(this.ORDER_STATE.find(e => e.type == this.order.order.state));
    
    this.stateString = this.ORDER_STATE.find(e => e.type == this.order.order.state).text;
  }

}
