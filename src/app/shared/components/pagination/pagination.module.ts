import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginationComponent} from './pagination.component';
import {NbIconModule} from "@nebular/theme";

@NgModule({
  declarations: [PaginationComponent],
  exports: [
    PaginationComponent
  ],
  imports: [
    CommonModule,
    NbIconModule
  ]
})
export class PaginationModule { }
