import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { OrderInfoModel } from '../../../shared/model/order-info.model';

@Component({
  selector: 'ngx-list-order-info',
  templateUrl: './list-order-info.component.html',
  styleUrls: ['./list-order-info.component.scss']
})
export class ListOrderInfoComponent implements OnInit , OnChanges{
 
  @Input() orderInfos: OrderInfoModel[];
  @Input() selectedOrderInfo: OrderInfoModel;
  isSelectedItemIndex: number = 0;
  readonly columns = [
    {name: 'Tên người đặt hàng', prop: 'name', flexGrow: 1},
    {name: 'Email', prop: 'email', flexGrow: 1},
    {name: 'Địa chỉ đặt hàng', prop: 'address', flexGrow: 3},
    {name: 'Số điện thoại đặt hàng', prop: 'phone', flexGrow: 1},
    {name: 'Chọn thông tin', prop: 'state', flexGrow: 0.75}
  ];
  constructor(protected ref: NbDialogRef<ListOrderInfoComponent>) { }

  ngOnInit() {
    if(this.orderInfos){
      this.orderInfos.forEach((e, idx) => {
        if(e.id === this.selectedOrderInfo.id) this.isSelectedItemIndex = idx;
      })
    }
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  onSelectInfo(item: OrderInfoModel){
    this.ref.close(item);
  }

  /*###########################################################################################*/
  dismiss() {
    this.ref.close();
  }
}
