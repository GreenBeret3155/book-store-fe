import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { OrderInfoModel } from '../../shared/model/order-info.model';
import { OrderInfoService } from '../../shared/services/main/order-info.service';
import { AddOrderInfoDialogComponent } from '../components/add-order-info-dialog/add-order-info-dialog.component';

@Component({
  selector: 'ngx-order-info-page',
  templateUrl: './order-info-page.component.html',
  styleUrls: ['./order-info-page.component.scss']
})
export class OrderInfoPageComponent implements OnInit {

  orderInfos: OrderInfoModel[] = [];
  selectedOrderInfo: OrderInfoModel;
  isSelectedItemIndex: number = 0;

  readonly columns = [
    {name: 'Tên người đặt hàng', prop: 'name', flexGrow: 1},
    {name: 'Địa chỉ đặt hàng', prop: 'address', flexGrow: 3},
    {name: 'Số điện thoại đặt hàng', prop: 'phone', flexGrow: 1},
    {name: 'Xóa thông tin', prop: 'delete', flexGrow: 0.75},
    {name: 'Đặt thông tin làm mặc định', prop: 'state', flexGrow: 1}
  ];

  constructor(private orderInfoService : OrderInfoService,
    private dialogService: NbDialogService,
  ) { }

  ngOnInit() {
     this.initOrderInfos();
  }

  initOrderInfos(){
    this.orderInfoService.getAllOrderInfos().subscribe(res =>{
      this.orderInfos = res.body;
      this.orderInfoService.sortDefaultOrderInfos(this.orderInfos);
      this.selectedOrderInfo = this.orderInfos[0];
    });
  }

  createNewOrderInfo(){
    this.dialogService.open(AddOrderInfoDialogComponent, {
      backdropClass: 'dark-backdrop',
      context: {
      }
    }).onClose.subscribe(res => {      
      if(res){
        this.initOrderInfos();
      }
    })
  }

  onSelectInfo(item: OrderInfoModel){
    this.orderInfoService.makeDefaultOrderInfo(item.id).subscribe(res => {
      this.selectedOrderInfo = item;
      this.orderInfos.forEach((e, idx) => {
        if(e.id === this.selectedOrderInfo.id) this.isSelectedItemIndex = idx;
      });
    })
  }

  onDeleteInfo(item: OrderInfoModel){
    this.orderInfoService.deleteOrderInfo(item.id).subscribe(res => {
      this.orderInfos = res.body;
      this.orderInfoService.sortDefaultOrderInfos(this.orderInfos);
      this.selectedOrderInfo = this.orderInfos[0];
    });
  }

}
