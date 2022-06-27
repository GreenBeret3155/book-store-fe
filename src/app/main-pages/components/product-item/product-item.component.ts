import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { ProductModel } from '../../../shared/model/product.model';
import * as ProductActions from '../../../@core/actions/product.actions'
import * as _ from 'lodash';

@Component({
  selector: 'ngx-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() item: ProductModel;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  addProductToCart() {    
    if(this.item){
      this.store.dispatch(new ProductActions.AddProduct(_.clone(this.item)) )
    }
  }
}
