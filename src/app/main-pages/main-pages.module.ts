import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPagesRoutingModule } from './main-pages-routing.module';
import { MainPagesComponent } from './main-pages.component';
import { ThemeModule } from '../@theme/theme.module';
import { NbAccordionModule, NbActionsModule, NbButtonModule, NbCardModule, NbChatComponent, NbChatFormComponent, NbChatMessageComponent, NbChatMessageFileComponent, NbChatModule, NbChatOptions, NbContextMenuModule, NbDialogModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbSearchModule, NbSelectModule, NbSidebarModule, NbUserModule } from '@nebular/theme';
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
import { ListOrderInfoComponent } from './components/list-order-info/list-order-info.component';
import { ComfirmOrderComponent } from './components/comfirm-order/comfirm-order.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { OrderPageItemHeaderComponent } from './components/order-page-item-header/order-page-item-header.component';
import { ShareLibModuleModule } from '../share-lib-module/share-lib-module.module';
import { OrderDetailPageComponent } from './order-detail-page/order-detail-page.component';
import { PaymentResultPageComponent } from './payment-result-page/payment-result-page.component';
import { ChatBotDialogComponent } from './components/chat-bot-dialog/chat-bot-dialog.component';
import { OrderInfoPageComponent } from './order-info-page/order-info-page.component';
import { AddOrderInfoDialogComponent } from './components/add-order-info-dialog/add-order-info-dialog.component';
import { DescriptionDialogComponent } from './components/description-dialog/description-dialog.component';

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
  NbAccordionModule
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
    ListOrderInfoComponent,
    ComfirmOrderComponent,
    OrderPageComponent,
    OrderPageItemHeaderComponent,
    OrderDetailPageComponent,
    PaymentResultPageComponent,
    ChatBotDialogComponent,
    OrderInfoPageComponent,
    AddOrderInfoDialogComponent,
    DescriptionDialogComponent,
  ],
  imports: [
    ...NB_MODULES,
    ShareLibModuleModule,
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
  entryComponents:[ListOrderInfoComponent, ComfirmOrderComponent, AddOrderInfoDialogComponent, DescriptionDialogComponent]
})
export class MainPagesModule { }
