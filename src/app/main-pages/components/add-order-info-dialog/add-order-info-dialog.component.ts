import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { numberValidator } from '../../../shared/directives/custome-number.directive';
import { OrderInfoModel } from '../../../shared/model/order-info.model';
import { OrderInfoService } from '../../../shared/services/main/order-info.service';
import { ListOrderInfoComponent } from '../list-order-info/list-order-info.component';

@Component({
  selector: 'ngx-add-order-info-dialog',
  templateUrl: './add-order-info-dialog.component.html',
  styleUrls: ['./add-order-info-dialog.component.scss']
})
export class AddOrderInfoDialogComponent implements OnInit {

  infoForm: FormGroup = this.fb.group({
    name: [null, [Validators.required, Validators.maxLength(160)]],
    address: [null, [Validators.required, Validators.maxLength(160)]],
    phone: [null, [numberValidator(/^[0-9]\d*(\.\d{0,10})?$/)]],
  });

  constructor(protected ref: NbDialogRef<ListOrderInfoComponent>,
    private fb: FormBuilder,
    private orderInfoService : OrderInfoService,
  ) { }

  ngOnInit() {
  }

  save(){
    if(!this.infoForm.valid){
      return ;
    }
    let data: OrderInfoModel = this.infoForm.getRawValue();
    this.orderInfoService.createOrderInfo(data).subscribe(res => {
      this.ref.close(1);
    })
  }

  dismiss() {
    this.ref.close();
  }

}
