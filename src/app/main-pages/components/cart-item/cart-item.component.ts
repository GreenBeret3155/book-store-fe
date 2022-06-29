import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { AddProduct, ReplaceProduct } from '../../../@core/actions/product.actions';
import { AppState } from '../../../app.state';
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

  constructor(private store: Store<AppState>,) { }

  ngOnInit() {
    this.totalCost = this.item.quantity * this.item.price;
  }

  ngOnChanges(changes: SimpleChange){
  }

  onQuantityChange($event : number){
    this.item.quantity = $event;
    this.saveProductToCart(this.item);
    this.totalCost = this.item.quantity * this.item.price;
  }

  onCheckboxChange($event){
    this.item.isSelected = $event;
    this.saveProductToCart(this.item);
  }

  saveProductToCart(item: any) {    
    if(this.item){      
      this.store.dispatch(new ReplaceProduct(item));
    }
  }
}
