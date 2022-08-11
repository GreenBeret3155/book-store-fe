import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../app.state';
import { LoginDialogComponent } from '../../../auth-routing/login-dialog/login-dialog.component';
import { ProductModel } from '../../../shared/model/product.model';
import { AddUser, ClearUser } from '../../../@core/actions/user.actions'
import { AccountService } from '../../../@core/auth/account.service';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { CartService } from '../../../shared/services/main/cart.service';
import { InitProduct } from '../../../@core/actions/product.actions';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { RegisterDialogComponent } from '../../../auth-routing/register-dialog/register-dialog.component';

@Component({
  selector: 'ngx-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  products: ProductModel[] = [];
  productStore: Observable<ProductModel[]>;
  totalQuantity: number = 0;
  user: any;
  constructor(private router: Router,
    private dialogService: NbDialogService,
    private store: Store<AppState>,
    private accountService: AccountService,
    private cartService: CartService,
    private $localStorage: LocalStorageService,
    private $sessionStorage: SessionStorageService
  ) {
    this.productStore = this.store.select('products');
  }

  ngOnInit() {
    this.onInitUser();
    this.productStore.subscribe((e) => {
      this.products = e;
      this.totalQuantity = 0;
      this.products.forEach(e => this.totalQuantity += e.quantity ? e.quantity : 0)
    })

    this.productStore
      .pipe(debounceTime(2000))
      .subscribe(e => {
        if (e && Array.isArray(e) && e.length !== 0) {
          // isSelected true => 1
          e = e.map(element => {
            element.isSelected = element.isSelected ? 1 : 0;
            return element;
          })
          this.cartService.saveCart(e).subscribe(() => {
            console.log("save success");
          });
        }
      });
  }

  onInitUser() {
    this.user = null;
    const token = this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken') || '';
    if (token !== undefined && token !== null && token !== '') {
      this.accountService.identity().subscribe(res => {
        if (res) {
          this.user = res;
          this.store.dispatch(new AddUser(res));
        };
      });
    }
    this.cartService.refreshCart(token === undefined || token === null || token === '');
  }

  onOpenLoginDialog() {
    this.dialogService.open(LoginDialogComponent, {
      autoFocus: true,
    }).onClose.subscribe(({ userInfo }) => {
      if (userInfo) {
        this.onInitUser();
        this.store.dispatch(new AddUser(userInfo))
      }
    });
  }

  onOpenRegisterDialog() {
    const dialogNew = this.dialogService.open(RegisterDialogComponent, {
      hasBackdrop: true,
      closeOnBackdropClick: false
    });
    dialogNew.onClose.subscribe(data => {
      // if (data.result !== undefined &&  'complete' === data.result) {
      //   this.search();
      // }
    });
  }

  onLogout() {
    this.store.dispatch(new ClearUser());
    this.$localStorage.clear();
    this.onInitUser();
  }

  navigateToCart() {
    this.router.navigate(["/main-pages/cart"])
  }
}
