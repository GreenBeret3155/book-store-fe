import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Page } from '../../@core/model/page.model';
import { ProductModel } from '../../shared/model/product.model';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'ngx-product-search-page',
  templateUrl: './product-search-page.component.html',
  styleUrls: ['./product-search-page.component.scss']
})
export class ProductSearchPageComponent implements OnInit {

  products: Array<ProductModel> = [new ProductModel()];
  page = new Page();
  constructor(private productService : ProductService ) {
    this.page.pageNumber = 0;
    this.page.size = 16;
  }

  ngOnInit() {
    this.initProducts()
  }

  initProducts(){
    this.setPage({offset: 0});
  }

  onGotoPage(page){
    page -= 1;
    this.setPage({offset: page})
  }

  setPage(pageInfo) {
    const pageToLoad: number = pageInfo.offset;
    this.productService.getAllAction({
      page: pageToLoad,
      size: this.page.size
    }).subscribe(res => {      
      this.onSuccess(res.body, res.headers, pageToLoad)
    });
  }

  onSuccess(data: any | null, headers: HttpHeaders, page: number): void {
    console.log("X-Total-Count", Number(headers.get('X-Total-Count')));
    
    this.page.totalElements = Number(headers.get('X-Total-Count')) || 154;
    this.page.totalPages = this.page.totalElements ? Math.floor(this.page.totalElements/this.page.size) + 1 : 0; 
    this.page.pageNumber = page || 0;
    this.products = data || [];
  }
}
