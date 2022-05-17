import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule, NbDatepickerModule,
  NbIconModule, NbInputModule, NbPopoverModule, NbTooltipModule,
} from '@nebular/theme';
import {AreaViewerComponent} from './area-viewer/area-viewer.component';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {NbContextMenuModule} from '../contex-menu-custom/context-menu.module';
import {HeroPickerModule} from '../shared/components/hero-picker/hero-picker.module';
import {ToasterModule} from 'angular2-toaster';
import {TranslateModule} from '@ngx-translate/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ScreenComponent} from './screen/screen.component';
import {MenuTabsComponent} from './screen/menu-tabs/menu-tabs.component';
import {GridsterModule} from 'angular-gridster2';
@NgModule({
  declarations: [AreaViewerComponent, ScreenComponent, MenuTabsComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbIconModule,
    SharedModule,
    ReactiveFormsModule,
    NgSelectModule,
    NbButtonModule,
    NbContextMenuModule,
    HeroPickerModule,
    ToasterModule,
    TranslateModule,
    NbActionsModule,
    NbTooltipModule,
    MatTooltipModule,
    NbPopoverModule,
    NbDatepickerModule,
    NbInputModule,
    GridsterModule,
  ],
  exports: [AreaViewerComponent],
  entryComponents: []
})
export class AreaViewerModule {
}
