import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.scss']
})
export class QuantityComponent implements OnInit {
  @Input() originalQuantity: number;
  @Output() emitQuantity : EventEmitter<number> = new EventEmitter<number>();
  quantity : number = 1;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.originalQuantity && changes.originalQuantity.isFirstChange){
      this.quantity = changes.originalQuantity.currentValue;
    }
  }

  onMinus() {
    if (this.quantity != 1) {
      this.quantity -= 1;
    }
    this.emitValue(this.quantity);
  }

  onPlus() {
    this.quantity += 1;
    this.emitValue(this.quantity);
  }

  onBlurInputQuantity(){
    this.emitValue(this.quantity);
  }

  emitValue(v){
    this.emitQuantity.emit(v);
  }

}
