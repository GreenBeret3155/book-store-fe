import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbListModule, NbSpinnerModule,
  NbUserModule
} from '@nebular/theme';
import {ChatOfflineRoutingModule} from './chat-offline.routing.module';
import {NbContextMenuModule} from '../../contex-menu-custom/context-menu.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ShareLibModuleModule} from '../../share-lib-module/share-lib-module.module';
import {ChatCustomModule} from '../../chat-custom/chat-custom.module';
@NgModule({
  declarations: [ChatComponent],
  imports: [
    ChatOfflineRoutingModule,
    CommonModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbListModule,
    NbUserModule,
    NbContextMenuModule,
    NbSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    ShareLibModuleModule,
    ChatCustomModule,
  ]
})
export class ChatOfflineModule { }
