import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ClearAllProducts, InitProduct, RefreshProduct } from '../../@core/actions/product.actions';
import { AppState } from '../../app.state';
import { Constants } from '../../shared/common.constant';
import { OrderInfoModel } from '../../shared/model/order-info.model';
import { ProductModel } from '../../shared/model/product.model';
import { CartService } from '../../shared/services/main/cart.service';
import { OrderInfoService } from '../../shared/services/main/order-info.service';
import { CartItemComponent } from '../components/cart-item/cart-item.component';
import { ComfirmOrderComponent } from '../components/comfirm-order/comfirm-order.component';
import { ListOrderInfoComponent } from '../components/list-order-info/list-order-info.component';

@Component({
  selector: 'ngx-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit, AfterViewInit {
  @ViewChild(CartItemComponent, {static:false}) cartItemCompRefs: CartItemComponent;
  products: ProductModel[] = [];
  orderInfos: OrderInfoModel[] = [];
  selectedOrderInfo: OrderInfoModel;
  defaultOrderInfo : OrderInfoModel;
  productStore: Observable<ProductModel[]>;
  checkedAllFlag: boolean = false;
  totalPrice : number = 0;
  totalOriginalPrice : number = 0;
  totalDiscount : number = 0;
  totalQuantity : number = 0;
  isValidBuy: boolean = false;
  paymentType: number;
  PAYMENT_TYPE = Constants.PAYMENT_TYPE;

  constructor(private store: Store<AppState>,
    private router: Router,
    private dialogService: NbDialogService,
    private cartService: CartService,
    private orderInfoService : OrderInfoService) {
    this.productStore = this.store.select('products');
  }

  ngOnInit() {
    // this.cartService.getAllCartItems().subscribe(res => {
    //   const listCartItems : ProductModel[] = res.body;
    //   this.store.dispatch(new InitProduct(listCartItems))
    // })
    this.productStore.subscribe(e => {
      this.products = e;
      this.calculatePrice();
    });
    this.initOrderInfo();
  }

  ngAfterViewInit() {
    
  }

  initOrderInfo(){
    this.orderInfoService.getAllOrderInfos().subscribe(res =>{
      this.orderInfos = res.body;
      this.orderInfoService.sortDefaultOrderInfos(this.orderInfos);
      this.selectedOrderInfo = this.orderInfos[0];
    })
  }

  changeSelectedAllItems($event){
    this.products.map(e => {
      e.isSelected = $event;
    })
    this.store.dispatch(new RefreshProduct());
  }  

  onClickViewListOrderInfos() {
    this.dialogService.open(ListOrderInfoComponent, {
      backdropClass: 'dark-backdrop',
      context: {
        orderInfos: this.orderInfos,
        selectedOrderInfo: this.selectedOrderInfo
      }
    }).onClose.subscribe(res => {      
      if(res){
        this.selectedOrderInfo = res;
      }
    })
  }

  onClickBuy() {
    if(!this.paymentType){
      return ;
    }
    this.dialogService.open(ComfirmOrderComponent, {
      backdropClass: 'dark-backdrop',
      context: {
        selectedProducts: this.cartService.transformProductsToOrder(this.products),
        selectedOrderInfo: this.selectedOrderInfo,
        totalPrice: this.totalPrice,
        paymentType: this.paymentType,
      }
    }).onClose.subscribe(res => {      
      if(res){
        this.cartService.refreshCart();
        this.router.navigate(['main-pages/order'])
      }
    })
  }

  onClearCart(){
    this.cartService.clearCart().subscribe(async () => {
      await this.store.dispatch(new ClearAllProducts());
      this.cartService.refreshCart();
    },() => {
      console.log("Error!!!");
    })
  }

  calculatePrice(): void{
    let tp = 0;
    let top = 0;
    let tq = 0;

    this.products.forEach(e =>{
      if(e.isSelected){
        tp += e.price * (e.quantity ? e.quantity : 0)
        top += e.originalPrice * (e.quantity ? e.quantity : 0)
        tq += e.quantity ? e.quantity : 0
      }
    })
    this.totalPrice = tp;
    this.totalOriginalPrice = top;
    this.totalDiscount = tp - top;
    this.totalQuantity = tq;
    this.isValidBuy = this.totalPrice > 0;
  }

  onClickRadioPayment($event){
    this.paymentType = $event.target.value;
  }
}
