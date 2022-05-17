import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatFormComponent } from './chat-form/chat-form.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatMessageFileComponent } from './chat-message-file/chat-message-file.component';
import { ChatMessageTextComponent } from './chat-message-text/chat-message-text.component';
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import {RouterModule} from '@angular/router';
import { ChatMessageImageComponent } from './chat-message-image/chat-message-image.component';



@NgModule({
  declarations: [ChatFormComponent, ChatMessageComponent, ChatMessageFileComponent, ChatMessageTextComponent, ChatComponent, ChatMessageImageComponent],
  exports: [
    ChatFormComponent, ChatMessageComponent, ChatMessageFileComponent, ChatMessageTextComponent, ChatComponent
  ],
    imports: [
        CommonModule,
        NbInputModule,
        FormsModule,
        NbButtonModule,
        NbIconModule,
        RouterModule,
        NbCardModule
    ]
})
export class ChatCustomModule {

}
