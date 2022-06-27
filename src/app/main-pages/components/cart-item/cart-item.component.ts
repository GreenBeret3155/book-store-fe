import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { ProductModel } from '../../../shared/model/product.model';

@Component({
  selector: 'ngx-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input() item: ProductModel;
  itemQuantity : number = 1;
  totalCost: number = 0;

  constructor() { }

  ngOnInit() {
    this.itemQuantity = this.item.quantity;
    this.totalCost = this.itemQuantity * this.item.price;
  }

  ngOnChanges(changes: SimpleChange){
  }

  onQuantityChange($event : number){
    this.itemQuantity = $event;
    this.totalCost = this.itemQuantity * this.item.price;
  }

}
