import {NgModule} from '@angular/core';
import {ThemeModule} from '../@theme/theme.module';
import {PagesComponent} from './pages.component';
import {PagesRoutingModule} from './pages-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {NbCardModule, NbIconModule, NbInputModule, NbMenuModule} from '@nebular/theme';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '../shared/shared.module';
import {NgSelectModule} from '@ng-select/ng-select';
import {TreeviewModule} from 'ngx-treeview';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

@NgModule({
  imports: [
    PagesRoutingModule,
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
  ],
  declarations: [
    PagesComponent,
  ],
  entryComponents: []
})
export class PagesModule {
}
