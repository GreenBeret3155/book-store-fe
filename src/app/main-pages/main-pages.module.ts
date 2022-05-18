import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPagesRoutingModule } from './main-pages-routing.module';
import { MainPagesComponent } from './main-pages.component';
import { ThemeModule } from '../@theme/theme.module';
import { NbActionsModule, NbButtonModule, NbCardModule, NbContextMenuModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbSearchModule, NbSelectModule, NbSidebarModule, NbUserModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { MiscellaneousModule } from '../pages/miscellaneous/miscellaneous.module';
import { NbSecurityModule } from '@nebular/security';
import { NbEvaIconsModule } from '@nebular/eva-icons';

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
];

@NgModule({
  declarations: [MainPagesComponent],
  imports: [
    ...NB_MODULES,
    CommonModule,
    MainPagesRoutingModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbIconModule,
    NbMenuModule,
    FormsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    NgSelectModule,
    MiscellaneousModule
  ]
})
export class MainPagesModule { }
