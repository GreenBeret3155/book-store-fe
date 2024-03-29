/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NbContextMenuDirective} from './context-menu.directive';
import {NbContextMenuComponent} from './context-menu.component';
import {NbMenuModule} from '../menu-custom/menu.module';
import {NbOverlayModule} from '@nebular/theme';


@NgModule({
  imports: [CommonModule, NbOverlayModule, NbMenuModule],
  exports: [NbContextMenuDirective],
  declarations: [NbContextMenuDirective, NbContextMenuComponent],
  entryComponents: [NbContextMenuComponent],
})
export class NbContextMenuModule {
}
