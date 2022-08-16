import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Page } from '../../../@core/model/page.model';
import { ICategoryModel } from '../../../shared/model/category.model';
import { AdminProductService } from '../../../shared/services/admin/admin-product.service';
import { CategoryUpdateComponent } from '../category-update/category-update.component';

@Component({
  selector: 'ngx-category-search',
  templateUrl: './category-search.component.html',
  styleUrls: ['./category-search.component.scss']
})
export class CategorySearchComponent implements OnInit {

  page = new Page();
  categories?: ICategoryModel[] = new Array<ICategoryModel>();
  columns = [
    {name: 'Số thứ tự', prop: 'stt', flewGrow: 1},
    {name: 'Id', prop: 'id', flexGrow: 1},
    {name: 'Tên danh mục', prop: 'name', flexGrow: 2},
    {name: 'Thao tác', prop: 'action_btn', flexGrow: 1},
  ];
  searchForm: FormGroup = this.fb.group({
    q: [null],
  });
  selected: any[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toasterService: NbToastrService,
    private dialogService: NbDialogService,
    private adminProductService: AdminProductService
  ) {
    this.page.pageNumber = 0;
    this.page.size = 10;
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
    this.adminProductService.queryCategories({
      page: pageToLoad,
      size: this.page.size,
      q: this.searchForm.value.q,
    }).subscribe(res => this.onSuccess(res.body, res.headers, pageToLoad));
  }

  protected onSuccess(data: any | null, headers: HttpHeaders, pageIdx: number): void {
    this.page.totalElements = Number(headers.get('X-Total-Count'));
    pageIdx = pageIdx || 0;
    this.page.pageNumber = pageIdx;
    this.categories = data || [];
  }

  new() {
    this.dialogService.open(CategoryUpdateComponent, {
      backdropClass: 'dark-backdrop',
      context: {
      },
      hasBackdrop: true,
      closeOnBackdropClick: false
    }).onClose.subscribe(res => {
      if(res){
        this.setPage({offset: 0});
      }
    });
  }

  edit(row) {
    if(!row.id){
      return;
    }
    this.dialogService.open(CategoryUpdateComponent, {
      backdropClass: 'dark-backdrop',
      context: {
        category: row
      },
      hasBackdrop: true,
      closeOnBackdropClick: false
    }).onClose.subscribe(res => {
      if(res){
        this.setPage({offset: 0});
      }
    });
  }

}
