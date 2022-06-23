import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../app.state';
import { LoginDialogComponent } from '../../../auth-routing/login-dialog/login-dialog.component';
import { ProductModel } from '../../../shared/model/product.model';
import {AddUser} from '../../../@core/actions/user.actions' 
import { AccountService } from '../../../@core/auth/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  products: ProductModel[] = [];
  productStore :Observable<ProductModel[]>;
  totalQuantity:number = 0;
  constructor(private router: Router,
    private dialogService: NbDialogService,
    private store: Store<AppState>,
    private accountService : AccountService
  ) {
    this.productStore = this.store.select('products');
  }

  ngOnInit() {
    this.accountService.identity().subscribe(res => {
      if(res){
        this.store.dispatch(new AddUser(res))
      };
    });
    this.productStore.subscribe((e) => {
      this.products = e;
      this.totalQuantity = 0;
      console.log(this.products);
      
      this.products.forEach(e => this.totalQuantity += e.quantity ? e.quantity : 0)
    })
  }

  onOpenLoginDialog(){
    this.dialogService.open(LoginDialogComponent, {
      autoFocus: true,
    }).onClose.subscribe(({userInfo}) => {
      if(userInfo){
        this.store.dispatch(new AddUser(userInfo))
      }
    });
  }

  navigateToCart(){
    this.router.navigate(["/main-pages/cart"])
  }

  
}
