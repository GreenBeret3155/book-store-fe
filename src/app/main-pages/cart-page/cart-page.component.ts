import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../app.state';
import { ProductModel } from '../../shared/model/product.model';

@Component({
  selector: 'ngx-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  
  products: ProductModel[] = [];
  productStore: Observable<ProductModel[]>;

  constructor(private store: Store<AppState>,) {
    this.productStore = this.store.select('products');
  }

  ngOnInit() {
    this.productStore.subscribe(e => {
      this.products = e;
      console.log(this.products);
    });
  }

}
