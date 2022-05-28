import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Page } from '../../@core/model/page.model';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'ngx-product-search-page',
  templateUrl: './product-search-page.component.html',
  styleUrls: ['./product-search-page.component.scss']
})
export class ProductSearchPageComponent implements OnInit {

  products: any;
  page = new Page();
  constructor(private productService : ProductService ) {
    this.page.pageNumber = 0;
    this.page.size = 10;
  }

  ngOnInit() {
    this.initProducts()
  }

  initProducts(){
    this.setPage({offset: 0});
  }

  setPage(pageInfo) {
    const pageToLoad: number = pageInfo.offset;
    this.productService.getAllAction({
      page: pageToLoad,
      size: this.page.size
    }).subscribe(res => this.onSuccess(res.body, res.headers, pageToLoad));
  }

  protected onSuccess(data: any | null, headers: HttpHeaders, page: number): void {
    console.log(data);
    
    this.page.totalElements = Number(headers.get('X-Total-Count'));
    this.page.pageNumber = page || 0;
    this.products = data || [];
  }
}
