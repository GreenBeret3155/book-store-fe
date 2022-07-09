import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
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

  readonly columns = [
    {name: 'Tên sách', prop: 'name', flexGrow: 2.5},
    {name: 'Tác giả', prop: 'authorName', flexGrow: 1.5},
    {name: 'Đơn giá', prop: 'price', flexGrow: 1},
    {name: 'Số lượng', prop: 'quantity', flexGrow: 1},
    {name: 'Thành tiền', prop: 'totalPrice', flexGrow: 1},
  ];

  constructor(protected ref: NbDialogRef<ComfirmOrderComponent>,
    private toastrService: NbToastrService,
    private orderService : OrderService) { }

  ngOnInit() {
    console.log(this.selectedProducts, this.selectedOrderInfo);
  }

  onClickBuy(){
    const data = {
      info : this.selectedOrderInfo,
      items : this.selectedProducts
    }
    this.orderService.saveOrder(data).subscribe(res => this.onOrderSuccess(res.body));
  }

  onOrderSuccess(result: any){
    const iconConfig: any = {icon: 'done-all-outline', pack: 'eva'};
    this.toastrService.success('Xác nhân đặt hàng thành công! Đơn hàng đang được xử lý ', 'Thông báo', iconConfig)
    this.ref.close(result)
  }

  dismiss() {
    this.ref.close();
  }

  notiSuccess(){
    
  }

}
