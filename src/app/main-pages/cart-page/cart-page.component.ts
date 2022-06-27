import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ClearAllProducts, InitProduct } from '../../@core/actions/product.actions';
import { AppState } from '../../app.state';
import { ProductModel } from '../../shared/model/product.model';
import { CartService } from '../../shared/services/main/cart.service';
import { CartItemComponent } from '../components/cart-item/cart-item.component';

@Component({
  selector: 'ngx-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit, AfterViewInit {
  @ViewChild(CartItemComponent, {static:false}) cartItemCompRefs: CartItemComponent;
  products: ProductModel[] = [];
  productStore: Observable<ProductModel[]>;
  checkedAllFlag: boolean = false;

  constructor(private store: Store<AppState>,
    private cartService: CartService) {
    this.productStore = this.store.select('products');
  }

  ngOnInit() {
    // this.cartService.getAllCartItems().subscribe(res => {
    //   const listCartItems : ProductModel[] = res.body;
    //   this.store.dispatch(new InitProduct(listCartItems))
    // })
    this.productStore.subscribe(e => {
      this.products = e;
    });
  }

  ngAfterViewInit() {
    
  }

  changeSelectedAllItems($event){
    this.products.map(e => {
      e.isSelected = $event;
    })
  }

  onClearCart(){
    this.cartService.clearCart().subscribe(() => {
      this.store.dispatch(new ClearAllProducts());
    },() => {
      console.log("Error!!!");
    })
  }
}
