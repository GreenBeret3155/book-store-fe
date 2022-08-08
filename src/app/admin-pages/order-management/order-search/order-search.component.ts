import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Page } from '../../../@core/model/page.model';
import { Constants } from '../../../shared/common.constant';
import { AdminOrderService } from '../../../shared/services/admin/admin-order.service';
import { AdminProductService } from '../../../shared/services/admin/admin-product.service';

@Component({
  selector: 'ngx-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.scss']
})
export class OrderSearchComponent implements OnInit {

  page = new Page();
  orders= [];
  columns = [
    {name: '', prop: 'checkbox', flewGrow: 0.3},
    {name: 'Mã đơn hàng', prop: 'id', flexGrow: 0.5},
    {name: 'Trạng thái', prop: 'state', flexGrow: 1},
    {name: 'Giá trị đơn hàng', prop: 'amount', flexGrow: 1},
    {name: 'Thời gian đặt hàng', prop: 'orderTime', flexGrow: 1},
    {name: 'Thời gian cập nhật', prop: 'updateTime', flexGrow: 1},
    {name: 'Tài khoản cập nhật', prop: 'updateUser', flexGrow: 0.5},
    {name: '', prop: 'action_btn', flexGrow: 1},
  ];
  searchForm: FormGroup = this.fb.group({
    state: [null],
    id: [null]
  });
  selected: any[] = [];
  lstStatus = Constants.ORDER_STATE;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private sessionStorageService: SessionStorageService,
    private translate: TranslateService,
    private toasterService: NbToastrService,
    private dialogService: NbDialogService,
    private adminOrderService: AdminOrderService
  ) {
    this.page.pageNumber = 0;
    this.page.size = 20;
  }

  ngOnInit() {
    this.setPage({offset: 0});
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  setPage(pageInfo) {
    const pageToLoad: number = pageInfo.offset || pageInfo.pageNumber;
    this.adminOrderService.query({
      id: this.searchForm.value.id,
      state: this.searchForm.value.state
    },
    {
      page: pageToLoad,
      size: this.page.size,
    }).subscribe(res => this.onSuccess(res.body, res.headers, pageToLoad));
  }

  protected onSuccess(data: any | null, headers: HttpHeaders, pageIdx: number): void {
    this.page.totalElements = Number(headers.get('X-Total-Count')) || 1;
    pageIdx = pageIdx || 0;
    this.page.pageNumber = pageIdx;
    this.orders = data || [];
  }

  edit(event) {
    this.sessionStorageService.store('chartFilter', this.searchForm.getRawValue());
    this.sessionStorageService.store('chartPageInfo', this.page);
    this.router.navigate([`/admin-pages/order-management/detail/${event.id}`]);
  }

  getStateString(input:number): string{
    return this.lstStatus.find(e => e.type == input).text
  }

  nextState(){

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
