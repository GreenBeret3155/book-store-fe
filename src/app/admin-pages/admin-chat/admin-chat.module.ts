import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminChatRoutingModule } from './admin-chat-routing.module';
import { AdminChatComponent } from './admin-chat.component';
import { NbActionsModule, NbButtonModule, NbCardModule, NbChatComponent, NbChatFormComponent, NbChatMessageComponent, NbChatMessageFileComponent, NbChatModule, NbChatOptions, NbContextMenuModule, NbDialogModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbMenuModule, NbSearchModule, NbSelectModule, NbSidebarModule, NbUserModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { MiscellaneousModule } from '../../pages/miscellaneous/miscellaneous.module';
import { PaginationModule } from '../../shared/components/pagination/pagination.module';
import { NbSecurityModule } from '@nebular/security';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { ShareLibModuleModule } from '../../share-lib-module/share-lib-module.module';

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
  NbListModule
];

@NgModule({
  declarations: [AdminChatComponent, ChatWindowComponent],
  imports: [
    ...NB_MODULES,
    CommonModule,
    AdminChatRoutingModule,
    ThemeModule,
    FormsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    NgSelectModule,
    MiscellaneousModule,
    PaginationModule,
    ShareLibModuleModule
  ]
})
export class AdminChatModule { }
