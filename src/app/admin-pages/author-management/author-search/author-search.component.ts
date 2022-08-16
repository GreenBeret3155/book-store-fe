import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { SessionStorageService } from 'ngx-webstorage';
import { Page } from '../../../@core/model/page.model';
import { IAuthorModel } from '../../../shared/model/author.model';
import { AdminProductService } from '../../../shared/services/admin/admin-product.service';
import { AuthorUpdateComponent } from '../author-update/author-update.component';

@Component({
  selector: 'ngx-author-search',
  templateUrl: './author-search.component.html',
  styleUrls: ['./author-search.component.scss']
})
export class AuthorSearchComponent implements OnInit {

  page = new Page();
  authors?: IAuthorModel[] = new Array<IAuthorModel>();
  columns = [
    {name: 'Số thứ tự', prop: 'stt', flewGrow: 1},
    {name: 'Id', prop: 'id', flexGrow: 1},
    {name: 'Tên tác giả', prop: 'name', flexGrow: 2},
    {name: 'Thao tác', prop: 'action_btn', flexGrow: 1},
  ];
  searchForm: FormGroup = this.fb.group({
    q: [null],
  });
  selected: any[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private sessionStorageService: SessionStorageService,
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
    this.adminProductService.queryAuthors({
      page: pageToLoad,
      size: this.page.size,
      q: this.searchForm.value.q,
    }).subscribe(res => this.onSuccess(res.body, res.headers, pageToLoad));
  }

  protected onSuccess(data: any | null, headers: HttpHeaders, pageIdx: number): void {
    this.page.totalElements = Number(headers.get('X-Total-Count'));
    pageIdx = pageIdx || 0;
    this.page.pageNumber = pageIdx;
    this.authors = data || [];
  }

  new() {
    this.dialogService.open(AuthorUpdateComponent, {
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
    this.dialogService.open(AuthorUpdateComponent, {
      backdropClass: 'dark-backdrop',
      context: {
        author: row
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
