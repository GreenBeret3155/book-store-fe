import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductManagementRoutingModule } from './product-management-routing.module';
import { ProductManagementComponent } from './product-management.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationModule } from '../../shared/components/pagination/pagination.module';
import { NbActionsModule, NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule, NbLayoutModule, NbSearchModule, NbSelectModule, NbToggleModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

const NB_MODULES = [
  NbLayoutModule,
  NbActionsModule,
  NbSearchModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
  NbInputModule,
  NbCardModule,
  NbDialogModule.forChild(),
  NbToggleModule
];

@NgModule({
  declarations: [ProductManagementComponent, ProductSearchComponent, ProductUpdateComponent],
  imports: [
    ...NB_MODULES,
    CommonModule,
    ProductManagementRoutingModule,
    CommonModule,
    ThemeModule,
    FormsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    NgSelectModule,
    PaginationModule,
  ]
})
export class ProductManagementModule { }
