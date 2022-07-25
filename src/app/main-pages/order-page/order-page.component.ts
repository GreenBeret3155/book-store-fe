import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../../shared/common.constant';
import { OrderService } from '../../shared/services/main/order.service';

@Component({
  selector: 'ngx-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {
  orderDetails : any[];
  ORDER_STATE = Constants.ORDER_STATE
  constructor(private orderService: OrderService,
    protected router: Router,) { }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe(res => {
      this.orderDetails = res.body;
    })
  }

  canCancelOrder(state: number){
    return state!= 3 && state != -1 && state != 2;
  }

  getOrderStateStatusColor(state :number){
    return this.ORDER_STATE.find(e => e.type == state).color;
  }

  getOrderStateIcon(state :number){
    return this.ORDER_STATE.find(e => e.type == state).icon;
  }

  getOrderStateName(state :number){
    return this.ORDER_STATE.find(e => e.type == state).text;
  }

  navigateOrderDetailPage(id: number){
    this.router.navigate([`/main-pages/order-detail/${id}`]);
    return;
  }
}
