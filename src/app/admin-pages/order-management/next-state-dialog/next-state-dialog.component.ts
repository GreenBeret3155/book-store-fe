import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { Constants } from '../../../shared/common.constant';

@Component({
  selector: 'ngx-next-state-dialog',
  templateUrl: './next-state-dialog.component.html',
  styleUrls: ['./next-state-dialog.component.scss']
})
export class NextStateDialogComponent implements OnInit, OnChanges {

  @Input() nextState;
  @Input() order;
  stateChoice;
  nextStateItems = [];
  infoForm: FormGroup = this.fb.group({
    description: [null, [Validators.required, Validators.maxLength(2000)]],
    content: [null, [Validators.maxLength(2000)]],
  });

  constructor(protected ref: NbDialogRef<NextStateDialogComponent>,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.stateChoice = this.nextState[0];
    this.nextStateItems = this.nextState.map(e => Constants.ORDER_STATE.find(element => element.type == +e));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.nextState && changes.nextState.currentValue && Array.isArray(changes.nextState.currentValue)){
      this.nextStateItems = changes.nextState.currentValue.map(e => Constants.ORDER_STATE.find(element => element.type == +e));
    }
  }

  getStateByType(input:number){
    return Constants.ORDER_STATE.find(e => e.type == input)
  }

  getOrderStateStatusColor(state :number){
    return Constants.ORDER_STATE.find(e => e.type == state).color;
  }

  getOrderStateIcon(state :number){
    return Constants.ORDER_STATE.find(e => e.type == state).icon;
  }

  getOrderStateName(state :number){
    return Constants.ORDER_STATE.find(e => e.type == state).text;
  }

  onClickRadioChoice($event){
    this.stateChoice = $event.target.value;
  }

  save(){
    if(!this.infoForm.valid){
      return ;
    }
    // goi api
    this.ref.close({
      state: this.stateChoice,
      description: this.infoForm.get('description').value,
      content: this.infoForm.get('content').value
    });
  }

  dismiss() {
    this.ref.close();
  }

}
