import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {CommonModule} from '@angular/common';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule, NbDatepickerModule, NbDialogModule,
  NbIconModule,
  NbInputModule, NbLayoutModule, NbListModule,
  NbSelectModule, NbTabsetModule, NbToastrModule, NbToggleModule
} from '@nebular/theme';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GridsterModule} from 'angular-gridster2';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {AngularResizedEventModule} from 'angular-resize-event';
import {UserManagementComponent} from './user-management.component';
import {UserRoutingModule} from './user-management.route';
import {UserConfigComponent} from './user-config/user-config.component';
import { UserConfigUpdateComponent } from './user-config-update/user-config-update.component';
import {NgxTrimDirectiveModule} from 'ngx-trim-directive';
import {ShareLibModuleModule} from '../../share-lib-module/share-lib-module.module';
import {ConfirmDialogComponent} from '../../share-lib-module/confirm-dialog/confirm-dialog.component';
import {TranslateModule} from '@ngx-translate/core';
import {ToasterModule} from 'angular2-toaster';

@NgModule({
  declarations: [UserManagementComponent, UserConfigComponent, UserConfigUpdateComponent],
  imports: [
    ShareLibModuleModule,
    CommonModule,
    UserRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbCheckboxModule,
    NbInputModule,
    NbSelectModule,
    NbTabsetModule,
    NbLayoutModule,
    NbListModule,
    NgSelectModule,
    NbToggleModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    GridsterModule,
    SharedModule,
    Ng2SmartTableModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    NbDialogModule.forChild(),
    NbDatepickerModule,
    AngularResizedEventModule,
    NgxTrimDirectiveModule,
    TranslateModule,
    ToasterModule
  ],
  exports: [
  ],
  entryComponents: [
    ConfirmDialogComponent,
    UserConfigUpdateComponent
  ]
})
export class UserManagementModule {}
