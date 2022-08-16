import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorManagementRoutingModule } from './author-management-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationModule } from '../../shared/components/pagination/pagination.module';
import { NbActionsModule, NbButtonModule, NbCardModule, NbContextMenuModule, NbDialogModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbSearchModule, NbSelectModule, NbSidebarModule, NbToggleModule, NbUserModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbSecurityModule } from '@nebular/security';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { MiscellaneousModule } from '../../pages/miscellaneous/miscellaneous.module';
import { AuthorManagementComponent } from './author-management.component';
import { AuthorSearchComponent } from './author-search/author-search.component';
import { AuthorUpdateComponent } from './author-update/author-update.component';

const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
  NbInputModule,
  NbCardModule,
  NbDialogModule.forChild(),
];

@NgModule({
  declarations: [AuthorManagementComponent, AuthorSearchComponent, AuthorUpdateComponent],
  imports: [
    ...NB_MODULES,
    CommonModule,
    AuthorManagementRoutingModule,
    ThemeModule,
    FormsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    NgSelectModule,
    MiscellaneousModule,
    PaginationModule,
  ],
  exports:[],
  entryComponents:[AuthorUpdateComponent]
})
export class AuthorManagementModule { }
