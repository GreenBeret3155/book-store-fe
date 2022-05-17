import {
  AfterViewInit,
  Component,
  ElementRef,
  Input, OnChanges,
  OnInit, SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {
  NbAdjustment,
  NbDialogService,
  NbOverlayRef,
  NbOverlayService,
  NbPosition,
  NbPositionBuilderService, NbTemplatePortal
} from '@nebular/theme';
import {Subject} from 'rxjs';
import {CatItemServiceService} from '../../services/cat-item-service.service';
import {FormBuilder} from '@angular/forms';
import {NbMenuService} from '../../../menu-custom/menu.service';
import {distinctUntilChanged, filter, takeUntil} from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'ngx-chart-filter',
  templateUrl: './chart-filter.component.html',
  styleUrls: ['./chart-filter.component.scss']
})
export class ChartFilterComponent implements OnInit, AfterViewInit {
  @Input() chartId: any;
  @Input() timeTypes: any;
  filterChartForm = this.fb.group({
    fromDate: [null],
    toDate: [null],
    timeType: [null]
  });
  rawValue: any;
  protected dlg: NbOverlayRef;
  chartViewerComponent: any;
  @ViewChild('btnFilter', {static: false}) btnFilter: ElementRef<any>;
  @ViewChild('overlay', {static: false}) overlayTemplate: TemplateRef<any>;
  destroy$: any = new Subject();
  @Input() filterObjectData: any;

  constructor(private catItemServiceService: CatItemServiceService,
              private fb: FormBuilder,
              protected dialogService: NbDialogService,
              protected vcr: ViewContainerRef,
              protected overlay: NbOverlayService,
              protected positionBuilder: NbPositionBuilderService) {
  }

  ngOnInit() {

  }

  initFilterForm() {
    this.catItemServiceService.getTimeBack(5).subscribe(timeBacks => {
      this.filterChartForm.get('toDate').valueChanges.pipe(distinctUntilChanged()).subscribe(val => {
        const tb = this.catItemServiceService.getTimeByType(timeBacks, this.filterChartForm.value.timeType, val);
        if (!this.filterChartForm.get('fromDate').value) {
          this.filterChartForm.get('fromDate').patchValue(tb, {emitEvent: false});
        }
      });

      this.filterChartForm.get('fromDate').valueChanges.pipe(distinctUntilChanged()).subscribe(val => {
        const tb = this.catItemServiceService.getTimeByType(timeBacks, this.filterChartForm.value.timeType, val, true);
        if (!this.filterChartForm.get('toDate').value) {
          this.filterChartForm.get('toDate').patchValue(tb, {emitEvent: false});
        }
      });

    });
    this.filterChartForm.get('timeType').valueChanges.subscribe(val => {
      this.filterChartForm.get('toDate').patchValue(null, {emitEvent: false});
      this.filterChartForm.get('fromDate').patchValue(null, {emitEvent: false});
    });
    this.catItemServiceService.getTimeTypes(22).subscribe(res => {
      if (!this.timeTypes) {
        this.timeTypes = res;
        this.filterChartForm.get('timeType').patchValue(this.chartViewerComponent.chartData.timeTypeDefault);
      }
    });
  }

  dismissOverlay() {
    this.dlg.detach();
  }

  showFilter(chartViewerComponent: any, btnFilter: any) {
    const positionStrategy = this.positionBuilder.connectedTo(btnFilter.hostElement)
      .position(NbPosition.BOTTOM)
      .adjustment(NbAdjustment.CLOCKWISE)
      .withFlexibleDimensions(true)
      .offset(20);
    this.dlg = this.overlay.create({positionStrategy, hasBackdrop: true});
    this.dlg.backdropClick().subscribe(() => this.dismissOverlay());
    this.chartViewerComponent = chartViewerComponent;
    this.btnFilter = btnFilter;
    if (this.dlg.hasAttached()) {
      return;
    }
    this.dlg.attach(new NbTemplatePortal(this.overlayTemplate, this.vcr));
    this.initFilterForm();
    if (!this.filterChartForm.get('timeType').value)
    this.filterChartForm.get('timeType').patchValue(chartViewerComponent.chartData.timeTypeDefault.toString());
  }

  setTimeTypes(timeTypes: any[], time) {
    this.timeTypes = [...timeTypes];
    this.filterChartForm.get('timeType').patchValue(time);
  }
  private calToDate(toDate) {
    if (!toDate) {
      return null;
    }
    switch (this.filterChartForm.value.timeType) {
      case '2': {
        return moment(toDate).startOf('month').toDate();
      }
      case '3': {
        return moment(toDate).startOf('quarter').toDate();
      }
      case '4': {
        return moment(toDate).startOf('year').toDate();
      }
      default: {
        return moment(toDate).startOf('day').toDate();
      }
    }
  }

  filterChart() {
    let dataFilter = Object.assign({}, this.filterObjectData)
    const fromDate = moment.isDate(this.filterChartForm.value.fromDate) ? moment(this.calToDate(this.filterChartForm.value.fromDate)).format('YYYYMMDD') : null;
    const toDate = moment.isDate(this.filterChartForm.value.toDate) ? moment(this.calToDate(this.filterChartForm.value.toDate)).format('YYYYMMDD') : null;
    if (this.filterObjectData) {
      dataFilter.fromDate = fromDate;
      dataFilter.toDate = toDate;
      dataFilter.timeType = this.filterChartForm.value.timeType;
    } else {
      dataFilter = {
        fromDate: fromDate,
        toDate: toDate,
        timeType: this.filterChartForm.value.timeType
      };
    }
    if (!this.chartViewerComponent.chartData.filterParams || !this.chartViewerComponent.chartData.filterParams.FROMDATE) {
      delete dataFilter.fromDate;
    }
    this.chartViewerComponent.getChartResult(this.chartId, dataFilter);
    this.rawValue = this.filterChartForm.getRawValue();
    this.dismissOverlay();
  }

  cancel() {
    if (this.rawValue) {
      this.filterChartForm.patchValue({
        fromDate: this.rawValue.fromDate,
        toDate: this.rawValue.toDate,
        timeType: this.rawValue.timeType
      });
    }
    this.dismissOverlay();
  }

  getTimeType(data ?) {
    switch (data) {
      case '1': {
        return 'date';
      }
      case '2': {
        return 'month';
      }
      case '3': {
        return 'quarter';
      }
      case '4': {
        return 'year';
      }
    }
  }

  ngAfterViewInit(): void {
  }
}
