import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdDirective} from './directives/ad.directive';
import {
  NbButtonModule,
  NbCalendarKitModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbNativeDateService,
  NbPopoverModule,
  NbProgressBarModule,
  NbSelectModule,
  NbSpinnerModule,
  NbUserModule
} from '@nebular/theme';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {InlineMessageComponent} from './directives/inline-message/inline-message.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NbDateFnsDateModule} from '@nebular/date-fns';
import * as vi from 'date-fns/locale/vi/index';
import {NbMomentDateModule} from '@nebular/moment';
import * as moment from 'moment';
import {VnPickerComponent} from './components/vn-picker/vn-picker.component';
import {NgxMaskModule} from 'ngx-mask';
import {TreePickerComponent} from './components/tree-picker/tree-picker.component';
import {TreeviewModule} from './components/tree-picker/ngx-treeview';
import {TranslateModule} from '@ngx-translate/core';
import {HighchartsChartModule} from 'highcharts-angular';
import {AngularResizedEventModule} from 'angular-resize-event';
import {NgxEchartsModule} from 'ngx-echarts';
import {ShareLibModuleModule} from '../share-lib-module/share-lib-module.module';
import {ChartModule} from 'angular-highcharts';
import {NbContextMenuModule} from '../contex-menu-custom/context-menu.module';
import {ChartFilterComponent} from './components/chart-filter/chart-filter.component';
import {WarningDialogComponent} from './components/warning-dialog/warning-dialog.component';
import {UserForwardComponent} from './components/user-forward/user-forward.component';
import {HeroPickerModule} from './components/hero-picker/hero-picker.module';
import {DownloadPageComponent} from './components/download-page/download-page.component';
import {UploadDialogComponent} from './components/upload-dialog/upload-dialog.component';
import {ImageViewComponent} from './components/image-view/image-view.component';
import {ViewChartFavoriteComponent} from './components/view-chart-favorite/view-chart-favorite.component';
import {GridsterModule} from 'angular-gridster2';
// import {TreeviewModule} from 'ngx-treeview';

@NgModule({
  declarations: [AdDirective, InlineMessageComponent, ImageViewComponent, VnPickerComponent, TreePickerComponent, ChartFilterComponent, WarningDialogComponent, UserForwardComponent, DownloadPageComponent, UploadDialogComponent, ViewChartFavoriteComponent],
  exports: [
    AdDirective,
    InlineMessageComponent,
    NgxMaskModule,
    TreePickerComponent,
    ImageViewComponent
  ],
  imports: [
    CommonModule,
    NbProgressBarModule,
    NbCardModule,
    NgxChartsModule,
    NgSelectModule,
    FormsModule,
    NbButtonModule,
    NbIconModule,
    AngularResizedEventModule,
    NbPopoverModule,
    ReactiveFormsModule,
    NbDatepickerModule,
    NbInputModule,
    NbSelectModule,
    NbDateFnsDateModule.forRoot({
      parseOptions: {awareOfUnicodeTokens: true, locale: vi},
      formatOptions: {awareOfUnicodeTokens: true, locale: vi},
    }),
    NbMomentDateModule,
    NgxMaskModule.forRoot(),
    NbCalendarKitModule,
    TreeviewModule.forRoot(),
    TranslateModule,
    HighchartsChartModule,
    NgxEchartsModule,
    ShareLibModuleModule,
    ChartModule,
    NbContextMenuModule,
    NbSpinnerModule,
    NbCheckboxModule,
    HeroPickerModule,
    NbCheckboxModule,
    NbListModule,
    NbUserModule,
    GridsterModule,
    // GridsterModule,
    // AreaViewerModule
  ],
})
export class SharedModule {
  constructor() {
    NbNativeDateService.prototype.parse = function (date, format) {
      const mydate = moment(date, 'DD/MM/YYYY');
      return new Date(moment(mydate).format('MM/DD/YYYY'));
    };
  }
}
