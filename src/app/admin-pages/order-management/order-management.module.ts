import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderManagementRoutingModule } from './order-management-routing.module';
import { OrderManagementComponent } from './order-management.component';
import { OrderSearchComponent } from './order-search/order-search.component';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationModule } from '../../shared/components/pagination/pagination.module';
import { NbActionsModule, NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule, NbLayoutModule, NbSearchModule, NbSelectModule, NbToggleModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ShareLibModuleModule } from '../../share-lib-module/share-lib-module.module';
import { NextStateDialogComponent } from './next-state-dialog/next-state-dialog.component';

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
  declarations: [OrderManagementComponent, OrderSearchComponent, OrderDetailComponent, NextStateDialogComponent],
  imports: [
    ...NB_MODULES,
    CommonModule,
    ThemeModule,
    FormsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    NgSelectModule,
    PaginationModule,
    OrderManagementRoutingModule,
    ShareLibModuleModule
  ],
  entryComponents:[NextStateDialogComponent]
})
export class OrderManagementModule { }
