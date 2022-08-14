import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Constants } from '../../shared/common.constant';
import { OrderService } from '../../shared/services/main/order.service';
import { DescriptionDialogComponent } from '../components/description-dialog/description-dialog.component';

@Component({
  selector: 'ngx-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {
  orderDetails : any[];
  ORDER_STATE = Constants.ORDER_STATE
  constructor(private orderService: OrderService,
    protected router: Router,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit() {
    this.initOrders();
  }

  initOrders(){
    this.orderService.getAllOrders().subscribe(res => {
      this.orderDetails = res.body;
    });
  }

  canCancelOrder(state: number){
    return Constants.LIST_STATE_DUOC_HUY.includes(state);
  }

  onCancelOrderClick(orderId: number){
    this.dialogService.open(DescriptionDialogComponent, {
      backdropClass: 'dark-backdrop',
      context: {
      }
    }).onClose.subscribe(res => {      
      if(res){
        this.cancelOrder(orderId, res);
      }
    })
  }

  cancelOrder(orderId: number, description: string){    
    this.orderService.cancelOrder({
      id: orderId,
    }).subscribe(res => {
      if(res.body && res.body.status){
        this.onNotificationSuccess(res.body.message);
        this.initOrders();
      } else {
        this.onNotificationFailed(res.body.message);
      }
    })
  }

  canPay(state: number){
    return state == 0;
  }

  onClickPay(orderId: number){
    const data = {
      id: orderId
    }
    this.orderService.payOrder(data).subscribe(res => {
      if(res.body.order && res.body.order.id && res.body.paymentResponse){
        if(res.body.paymentResponse && !res.body.paymentResponse.resultCode && res.body.paymentResponse.payUrl){
          this.goToLink(res.body.paymentResponse.payUrl);
        } else {
          this.onPayOrderFail(JSON.stringify(res.body));
        }
        // this.router.navigate([`/main-pages/order-detail/${res.body.order.id}`])
      }
    }, err => {
      this.onPayOrderFail(JSON.stringify(err));
    });
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

  onNotificationSuccess(result: string){
    const iconConfig: any = {icon: 'done-all-outline', pack: 'eva'};
    this.toastrService.success(result, 'Thông báo', iconConfig)
  }

  onNotificationFailed(result: string){
    this.toastrService.danger(result, 'Thông báo')
  }

  onPayOrderFail(result: any){
    const iconConfig: any = {icon: 'done-all-outline', pack: 'eva'};
    this.toastrService.danger(result, 'Thanh toán thất bại')
  }

  goToLink(url: string){
    window.open(url, "_blank");
  }
}
