import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { AdminProductService } from '../../../shared/services/admin/admin-product.service';

@Component({
  selector: 'ngx-amount-change-dialog',
  templateUrl: './amount-change-dialog.component.html',
  styleUrls: ['./amount-change-dialog.component.scss']
})
export class AmountChangeDialogComponent implements OnInit {

  @Input() pId;
  actionTypeChoice: number;
  nextStateItems = [];
  infoForm: FormGroup = this.fb.group({
    activated: [null, [Validators.required]],
    amount: [0, [Validators.maxLength(5), Validators.pattern('^[0-9]*')]]
  });
  minusPlus = [
    {type: 0, text: "Thêm sản phẩm vào kho", color: "primary", icon: "plus-circle-outline"},
    {type: 1, text: "Bớt sản phẩm ra khỏi kho", color: "danger", icon: "minus-circle-outline"}
  ]
  amountInfo;

  constructor(protected ref: NbDialogRef<AmountChangeDialogComponent>,
    private fb: FormBuilder,
    private adminProductService: AdminProductService
  ) { }

  ngOnInit() {
    this.adminProductService.getAmountByPId(this.pId).subscribe(res => {
      this.amountInfo = res.body;
      this.infoForm.get('activated').patchValue(this.amountInfo.available ? true:false);
    })
    this.actionTypeChoice = this.minusPlus[0].type;
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if(changes.nextState && changes.nextState.currentValue && Array.isArray(changes.nextState.currentValue)){
  //     this.nextStateItems = changes.nextState.currentValue.map(e => Constants.ORDER_STATE.find(element => element.type == +e));
  //   }
  // }

  getColor(type :number){
    return this.minusPlus.find(e => e.type == type).color;
  }

  getIcon(type :number){
    return this.minusPlus.find(e => e.type == type).icon;
  }

  onClickRadioChoice($event){
    this.actionTypeChoice = $event.target.value;
  }

  save(){
    if(!this.infoForm.valid){
      return ;
    }
    const data = {
      productId: this.pId,
      amount: this.actionTypeChoice ? (this.infoForm.get('amount').value * -1) : this.infoForm.get('amount').value,
      available: this.infoForm.get('activated').value ? 1 : 0
    }
    this.adminProductService.changeAmountProduct(data).subscribe(res => {
      console.log(res.body);
      this.ref.close();
    })
    // goi api
    // this.ref.close({
    //   state: this.stateChoice,
    //   description: this.infoForm.get('description').value,
    //   content: this.infoForm.get('content').value
    // });
  }

  dismiss() {
    this.ref.close();
  }

}
