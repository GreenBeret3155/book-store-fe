import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgSelectModule} from '@ng-select/ng-select';
import {DynamicConfigRoutingModule} from './dynamic-config-routing.module';
import {DynamicConfigComponent} from './dynamic-config.component';
import {ProfileConfigComponent} from './profile-config/profile-config.component';
import {
    NbAccordionModule, NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule, NbDatepickerModule, NbDialogModule,
    NbIconModule,
    NbInputModule, NbLayoutModule, NbListModule, NbRadioModule,
    NbSelectModule, NbSpinnerModule, NbTabsetModule, NbToggleModule, NbTooltipModule
} from '@nebular/theme';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GridsterModule} from 'angular-gridster2';
import {SharedModule} from '../../shared/shared.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {AngularResizedEventModule} from 'angular-resize-event';
import {UpdateProfileComponent} from './profile-config/update-profile/update-profile.component';
import {NgxTrimDirectiveModule} from 'ngx-trim-directive';
import {ConfirmDialogComponent} from '../../share-lib-module/confirm-dialog/confirm-dialog.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ColorPickerModule} from 'ngx-color-picker';
import {TranslateModule} from '@ngx-translate/core';
import {ToasterModule} from 'angular2-toaster';
import {HeroPickerModule} from '../../shared/components/hero-picker/hero-picker.module';
import {ShareLibModuleModule} from '../../share-lib-module/share-lib-module.module';
import {ScreenComponent} from './screen/screen.component';
import {MenuTabsComponent} from './screen/menu-tabs/menu-tabs.component';
import {AreaViewerModule} from '../../area-viewer/area-viewer.module';
import { ActionComponent } from './action/action.component';
import { AddActionComponent } from './action/addAction/addAction.component';
import {RoleModuleComponent} from './role-module/role-module.component';
import {AddRoleComponent} from './role-module/add-role/add-role.component';
import { ModuleComponent } from './modules/module.component';
import { AddModuleComponent } from './modules/addModule/addModule.component';
import { MapModuleComponent } from './modules/map-module/map-module.component';
import {MapPopupComponent} from './role-module/map-popup/map.popup.component';
import { TreeviewModule } from '../../shared/components/tree-picker/ngx-treeview/treeview.module';
import { DropdownTreeviewSelectModule } from '../../shared/components/tree-picker/ngx-treeview/dropdown-treeview-select/dropdown-treeview-select.module';

@NgModule({
  declarations: [DynamicConfigComponent, ProfileConfigComponent,
    UpdateProfileComponent,
    ScreenComponent,
    MenuTabsComponent,
    ActionComponent, AddActionComponent,
    ModuleComponent, AddModuleComponent, MapModuleComponent,
    RoleModuleComponent,
    MapPopupComponent,
    AddRoleComponent
  ],
  imports: [
    CommonModule,
    DynamicConfigRoutingModule,
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
    NbSpinnerModule,
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
    NbToggleModule,
    NbAccordionModule,
    DragDropModule,
    TreeviewModule.forRoot(),
    NbRadioModule,
    ColorPickerModule,
    TranslateModule,
    NbTooltipModule,
    NbActionsModule,
    ToasterModule,
    HeroPickerModule,
    ShareLibModuleModule,
    AreaViewerModule,
    DropdownTreeviewSelectModule
  ],
  exports:
    [
      ScreenComponent
    ],
  entryComponents:
    [
      ConfirmDialogComponent,
    ]
})

export class DynamicConfigModule {
}
