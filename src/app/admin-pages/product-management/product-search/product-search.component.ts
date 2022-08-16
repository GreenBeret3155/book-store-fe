import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogService, NbIconConfig, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Page } from '../../../@core/model/page.model';
import { ConfirmDialogComponent } from '../../../share-lib-module/confirm-dialog/confirm-dialog.component';
import { Constants } from '../../../shared/common.constant';
import { IProductModel } from '../../../shared/model/product.model';
import { AdminProductService } from '../../../shared/services/admin/admin-product.service';
import { AmountChangeDialogComponent } from '../amount-change-dialog/amount-change-dialog.component';

@Component({
  selector: 'ngx-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {

  page = new Page();
  products?: IProductModel[] = new Array<IProductModel>();
  columns = [
    {name: '', prop: 'checkbox', flewGrow: 0.3},
    {name: 'Id', prop: 'id', flexGrow: 0.3},
    {name: 'Tên sách', prop: 'name', flexGrow: 2},
    {name: 'Giá hiện tại', prop: 'price', flexGrow: 1},
    {name: 'Thời gian cập nhật', prop: 'updateTime', flexGrow: 1},
    {name: 'Tài khoản cập nhật', prop: 'updateUser', flexGrow: 0.5},
    {name: '', prop: 'action_btn', flexGrow: 1},
  ];
  searchForm: FormGroup = this.fb.group({
    authorId: [null],
    categoryId: [null],
    q: [null],
    status: [1, Validators.required]
  });
  authors: any;
  categories: any;
  selected: any[] = [];
  lstStatus = Constants.LIST_STATUS;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private sessionStorageService: SessionStorageService,
    private translate: TranslateService,
    private toasterService: NbToastrService,
    private dialogService: NbDialogService,
    private adminProductService: AdminProductService
  ) {
    this.page.pageNumber = 0;
    this.page.size = 10;
  }

  ngOnInit() {
    this.adminProductService.getAllAuthors().subscribe(res => {
      this.authors = res.body;
    });
    this.adminProductService.getAllCategories().subscribe(res => {
      this.categories = res.body;
    });
    this.setPage({offset: 0});
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      document.getElementById('titleChart-input').focus();
    })
  }

  setPage(pageInfo) {
    const pageToLoad: number = pageInfo.offset || pageInfo.pageNumber;
    this.adminProductService.query({
      page: pageToLoad,
      size: this.page.size,
      authorId: this.searchForm.value.authorId,
      categoryId: this.searchForm.value.categoryId,
      q: this.searchForm.value.q,
      status: this.searchForm.value.status
    }).subscribe(res => this.onSuccess(res.body, res.headers, pageToLoad));
  }

  protected onSuccess(data: any | null, headers: HttpHeaders, pageIdx: number): void {
    this.page.totalElements = Number(headers.get('X-Total-Count'));
    pageIdx = pageIdx || 0;
    this.page.pageNumber = pageIdx;
    this.products = data || [];
  }

  new() {
    this.sessionStorageService.store('chartFilter', this.searchForm.getRawValue());
    this.sessionStorageService.store('chartPageInfo', this.page);
    this.router.navigate([`/admin-pages/product-management/new`]);
  }

  edit(event) {
    this.sessionStorageService.store('chartFilter', this.searchForm.getRawValue());
    this.sessionStorageService.store('chartPageInfo', this.page);
    this.router.navigate([`/admin-pages/product-management/edit/${event.id}`]);
  }
  changeAmount(row) {
    if(!row.id){
      return;
    }
    const dialogUpdate = this.dialogService.open(AmountChangeDialogComponent, {
      backdropClass: 'dark-backdrop',
      context: {
        pId: row.id
      },
      hasBackdrop: true,
      closeOnBackdropClick: false
    });
    // dialogUpdate.onClose.subscribe(data => {
    //   if (data.result === 'complete') {
    //     this.search();
    //   }
    // });
  }
  delete(row: any) {
    // const ref = this.dialogService.open(ConfirmDialogComponent, {
    //   autoFocus: true,
    //   context: {
    //     message: this.translate.instant('configChart.confirm.delete', {titleChart: row.titleChart})
    //   },
    // });
    // ref.onClose.subscribe(res => {
    //   if (res) {
    //     this.chartConfigService.delete(row.id).subscribe(
    //       () => {
    //         this.setPage(this.page);
    //         const iconConfig: NbIconConfig = {icon: 'checkmark-outline', pack: 'eva'};
    //         this.toasterService.primary(this.translate.instant('configChart.success.delete'), this.translate.instant('configChart.notification'), iconConfig)
    //       },
    //       (error) => {
    //         const iconConfig: NbIconConfig = {icon: 'alert-circle-outline', pack: 'eva'};
    //         this.toasterService.warning(error.error.message, this.translate.instant('configChart.notification'), iconConfig)
    //       }
    //     );
    //   }
    // });
  }

  deleteMultiple() {
    // const ref = this.dialogService.open(ConfirmDialogComponent, {
    //   autoFocus: true,
    //   context: {
    //     message: this.translate.instant('configChart.confirm.delete' , {titleChart: 'đã chọn'})
    //   },
    // });
    // const ids = this.selected.map(e => e.id)
    // ref.onClose.subscribe(res => {
    //   if (res) {
    //     this.chartConfigService.deleteAll(ids).subscribe(
    //       () => {
    //         this.setPage(this.page);
    //         const iconConfig: NbIconConfig = {icon: 'checkmark-outline', pack: 'eva'};
    //         this.toasterService.primary(this.translate.instant('configChart.success.delete'), this.translate.instant('configChart.notification'), iconConfig)
    //       },
    //       (error) => {
    //         const iconConfig: NbIconConfig = {icon: 'alert-circle-outline', pack: 'eva'};
    //         this.toasterService.warning(error.error.message, this.translate.instant('configChart.notification'), iconConfig)
    //       }
    //     );
    //   }
    // });
  }
}
