import { Component, OnInit } from '@angular/core';
import { Constants } from '../../shared/common.constant';
import { OrderService } from '../../shared/services/main/order.service';

@Component({
  selector: 'ngx-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {
  orderDetails : any[];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe(res => {
      this.orderDetails = res.body;
    })
  }

  canCancelOrder(state: number){
    return state!= 3 && state != -1 && state != 2;
  }

  getOrderStateStatusColor(state :number){
    return Constants.ORDER_STATE_STATUS_COLOR[state];
  }

  getOrderStateIcon(state :number){
    return Constants.ORDER_STATE_ICON[state];
  }

  getOrderStateName(state :number){
    return Constants.ORDER_STATE[state];
  }
}
