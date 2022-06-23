import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPagesRoutingModule } from './main-pages-routing.module';
import { MainPagesComponent } from './main-pages.component';
import { ThemeModule } from '../@theme/theme.module';
import { NbActionsModule, NbButtonModule, NbCardModule, NbChatComponent, NbChatFormComponent, NbChatMessageComponent, NbChatMessageFileComponent, NbChatModule, NbChatOptions, NbContextMenuModule, NbDialogModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbSearchModule, NbSelectModule, NbSidebarModule, NbUserModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { MiscellaneousModule } from '../pages/miscellaneous/miscellaneous.module';
import { NbSecurityModule } from '@nebular/security';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductSearchPageComponent } from './product-search-page/product-search-page.component';
import { SearchSectionComponent } from './components/search-section/search-section.component';
import { ChatDialogComponent } from './components/chat-dialog/chat-dialog.component';
import { ChatDialogWrapperComponent } from './components/chat-dialog-wrapper/chat-dialog-wrapper.component';
import { PaginationModule } from '../shared/components/pagination/pagination.module';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { QuantityComponent } from './components/quantity/quantity.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';

const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbSecurityModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
  NbInputModule,
  NbCardModule,
  NbDialogModule.forChild(),
  NbChatModule,
];

@NgModule({
  declarations: [
    MainPagesComponent, 
    ProductItemComponent, 
    ProductSearchPageComponent, 
    SearchSectionComponent, 
    ChatDialogComponent,
    ChatDialogWrapperComponent,
    ProductDetailPageComponent,
    QuantityComponent,
    CartPageComponent,
    CartItemComponent,
  ],
  imports: [
    ...NB_MODULES,
    CommonModule,
    MainPagesRoutingModule,
    ThemeModule,
    FormsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    NgSelectModule,
    MiscellaneousModule,
    PaginationModule
  ],
  exports:[],
  entryComponents:[]
})
export class MainPagesModule { }
