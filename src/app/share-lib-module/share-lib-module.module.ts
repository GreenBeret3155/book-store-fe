import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TtYearPipe} from '../@theme/pipes/tt-year.pipe';
import {AbsolutePipe} from '../shared/absolute.pipe';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {NbButtonModule, NbCardModule} from '@nebular/theme';
import {DateFormatPipe} from '../shared/dataFormat.pipe';
import {ValuePipe} from '../@theme/pipes';
import {TruncatePipe} from '../shared/truncate.pipe';
import { ImagePathResolverPipe } from '../shared/image-path-resolver.pipe';

@NgModule({
  declarations: [TtYearPipe, AbsolutePipe, ConfirmDialogComponent, DateFormatPipe, ValuePipe, TruncatePipe, ImagePathResolverPipe],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule
  ],
  exports: [TtYearPipe, AbsolutePipe, ConfirmDialogComponent, DateFormatPipe, ValuePipe, TruncatePipe, ImagePathResolverPipe]
})
export class ShareLibModuleModule {
}
