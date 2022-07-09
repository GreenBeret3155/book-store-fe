import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { ProductModel } from '../../shared/model/product.model';
import { ProductService } from '../../shared/services/product.service';
import * as ProductActions from  '../../@core/actions/product.actions'
import * as _ from 'lodash';

@Component({
  selector: 'ngx-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss']
})
export class ProductDetailPageComponent implements OnInit {

  item: ProductModel | undefined;
  itemQuantity : number = 1;
  totalCost: number = 0;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService : ProductService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));
    this.productService.getProductById(productIdFromRoute).subscribe(res => {
      this.item = res.body;
      console.log(this.item);
      this.totalCost = this.item.price;
      if(this.item.description) this.addDescriptionContent();
    })
  }

  addDescriptionContent(){
    let wrapper = document.getElementById("content");
    let div = document.createElement('div');
    div.insertAdjacentHTML( 'beforeend', this.item.description)
    wrapper.appendChild(div);
  }

  onQuantityChange($event : number){
    this.itemQuantity = $event;
    this.totalCost = this.itemQuantity * this.item.price;
  }

  addProductToCart() {    
    if(this.item){
      this.item.quantity = this.itemQuantity;
      this.item.isSelected = false;
      this.store.dispatch(new ProductActions.AddProduct(_.clone(this.item)));
    }
  }

  addBuyNowProductToCart() {    
    if(this.item){
      this.store.dispatch(new ProductActions.UnselectAllProduct());
      this.item.quantity = this.itemQuantity;
      this.item.isSelected = true;
      this.store.dispatch(new ProductActions.ReplaceProduct(_.clone(this.item)));
      this.navigateToCart()
    }
  }

  navigateToCart() {
    this.router.navigate(["/main-pages/cart"])
  }
}
