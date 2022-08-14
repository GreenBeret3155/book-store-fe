import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Constants } from '../../../shared/common.constant';
import { OrderInfoModel } from '../../../shared/model/order-info.model';
import { ProductModel } from '../../../shared/model/product.model';
import { OrderService } from '../../../shared/services/main/order.service';

@Component({
  selector: 'ngx-comfirm-order',
  templateUrl: './comfirm-order.component.html',
  styleUrls: ['./comfirm-order.component.scss']
})
export class ComfirmOrderComponent implements OnInit {
  @Input() selectedOrderInfo : OrderInfoModel;
  @Input() selectedProducts: ProductModel[];
  @Input() totalPrice: number = 0;
  @Input() paymentType: number;
  readonly columns = [
    {name: 'Tên sách', prop: 'name', flexGrow: 2.5},
    {name: 'Tác giả', prop: 'authorName', flexGrow: 1.5},
    {name: 'Đơn giá', prop: 'price', flexGrow: 1},
    {name: 'Số lượng', prop: 'quantity', flexGrow: 1},
    {name: 'Thành tiền', prop: 'totalPrice', flexGrow: 1},
  ];
  readonly PAYMENT_TYPE = Constants.PAYMENT_TYPE;

  paymentItem: any = this.PAYMENT_TYPE[0];

  constructor(protected ref: NbDialogRef<ComfirmOrderComponent>,
    private toastrService: NbToastrService,
    private orderService : OrderService,
    private router: Router) { }

  ngOnInit() {
    // console.log(this.selectedProducts, this.selectedOrderInfo);
    this.paymentItem = this.PAYMENT_TYPE.find(e => e.type == this.paymentType)
  }

  onClickBuy(){
    const data = {
      info : this.selectedOrderInfo,
      items : this.selectedProducts,
      order: { paymentType: this.paymentType}
    }
    this.orderService.saveOrder(data).subscribe(res => {
      if(res.body.order && res.body.order.id && res.body.paymentResponse){
        this.onOrderSuccess(res.body);
        if(res.body.paymentResponse && !res.body.paymentResponse.resultCode && res.body.paymentResponse.payUrl){
          this.goToLink(res.body.paymentResponse.payUrl);
        } else {
          this.onOrderFail(JSON.stringify(res.body));
        }
        // this.router.navigate([`/main-pages/order-detail/${res.body.order.id}`])
      }
    }, err => {
      this.onOrderFail(JSON.stringify(err));
    });
  }

  onOrderSuccess(result: any){
    const iconConfig: any = {icon: 'done-all-outline', pack: 'eva'};
    this.toastrService.success('Xác nhân đặt hàng thành công!', 'Thông báo', iconConfig)
    this.ref.close(result)
  }

  onOrderFail(result: any){
    const iconConfig: any = {icon: 'done-all-outline', pack: 'eva'};
    this.toastrService.danger(result, 'Đặt hàng thất bại')
    this.ref.close(result)
  }

  dismiss() {
    this.ref.close();
  }

  goToLink(url: string){
    console.log(url);
    
    window.open(url, "_blank");
  }
}
