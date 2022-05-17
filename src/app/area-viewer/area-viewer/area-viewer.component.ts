import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {IAreaConfig} from '../../@core/model/area-config.model';
import {Router} from '@angular/router';
import {
  NbAdjustment,
  NbDialogService,
  NbIconLibraries,
  NbOverlayRef,
  NbOverlayService,
  NbPopoverDirective,
  NbPosition,
  NbPositionBuilderService,
  NbTemplatePortal,
  NbToastrService
} from '@nebular/theme';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CatItemServiceService} from '../../shared/services/cat-item-service.service';
import * as moment from 'moment';
import {ChartConfigService} from '../../shared/services/chart-config.service';
import {distinctUntilChanged, filter, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Overlay} from '@angular/cdk/overlay';
import {NbMenuService} from '../../menu-custom/menu.service';
import {ChartType} from '../../shared/common.constant';
import {WarningDialogComponent} from '../../shared/components/warning-dialog/warning-dialog.component';
import html2canvas from 'html2canvas';
import {ToasterService} from 'angular2-toaster';
import {CookieService} from 'ngx-cookie';
import {FavoriteService} from '../../shared/services/favorite.service';


@Component({
  selector: 'ngx-area-viewer',
  templateUrl: './area-viewer.component.html',
  styleUrls: ['./area-viewer.component.scss']
})
export class AreaViewerComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit, AfterContentInit {
  @ViewChild(NbPopoverDirective, {static: false}) popover: NbPopoverDirective;
  @Input() areaConfig: IAreaConfig;
  @Input() isSlideShow: boolean;
  @Input() isScreenDefault: boolean;
  rawValue: any;
  charts: any[];
  @ViewChild('chartViewerComponent', {static: false}) chartViewerComponent: any;
  filterChartForm = this.fb.group({
    fromDate: [null],
    toDate: [null],
    timeType: [null]
  });
  imageForm: FormGroup = this.fb.group({
    imageBlob: '',
    imageUrl: ''
  })
  timeTypes: any;
  currentChartIdx: number = 0;
  destroy$: any = new Subject();
  @ViewChild('btnFilter', {static: false}) btnFilter: ElementRef<any>;
  @ViewChild('overlay', {static: false}) overlayTemplate: TemplateRef<any>;
  protected ref: NbOverlayRef;
  @Input() enableFilter = true;
  items = [];
  test: any;
  divHeight: any;
  divWidth: any;
  filterObjectData: any;
  warning: any;
  mapScreens: any;

  initMenu() {
    this.items = [
      {
        title: 'Phóng to',
        icon: {
          icon: 'expand-outline',
          pack: 'eva'
        },
        tag: 'expand'
      },
      {
        title: 'Lọc biểu đồ',
        icon: {
          icon: 'funnel-outline',
          pack: 'eva'
        },
        tag: 'filter'
      },
      {
        title: 'Gửi cảnh báo',
        icon: {
          icon: 'message-circle-outline',
          pack: 'eva'
        },
        tag: 'warning'
      },
    ]
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.areaConfig.currentValue) {
      this.fetchChart();
    }
  }

  constructor(iconsLibrary: NbIconLibraries, private router: Router, private fb: FormBuilder,
              private catItemServiceService: CatItemServiceService, private chartConfigService: ChartConfigService,
              protected overlay: NbOverlayService, protected dialogService: NbDialogService,
              protected positionBuilder: NbPositionBuilderService,
              _overlay: Overlay,
              private cookieService: CookieService,
              private favoriteService: FavoriteService,
              protected vcr: ViewContainerRef,
              private menuService: NbMenuService,
              public toasterService: ToasterService,
              private toastrService: NbToastrService,
              private cdr: ChangeDetectorRef) {
    iconsLibrary.registerFontPack('fa', {packClass: 'fa', iconClassPrefix: 'fa'});
    iconsLibrary.registerFontPack('far', {packClass: 'far', iconClassPrefix: 'fa'});
    iconsLibrary.registerFontPack('ion', {iconClassPrefix: 'ion'});
    // catItemServiceService.getTimeTypes(22).pipe(takeUntil(this.destroy$)).subscribe(res => {
    //   this.timeTypes = res;
    // });

    catItemServiceService.getTimeBack(5).pipe(takeUntil(this.destroy$)).subscribe(timeBacks => {

      this.filterChartForm.get('toDate').valueChanges.pipe(distinctUntilChanged(), takeUntil(this.destroy$)).subscribe(val => {
        const tb = this.catItemServiceService.getTimeByType(timeBacks, this.filterChartForm.value.timeType, val);
        if (!this.filterChartForm.get('fromDate').value) {
          this.filterChartForm.get('fromDate').patchValue(tb, {emitEvent: false});
        }
      });

      this.filterChartForm.get('fromDate').valueChanges.pipe(distinctUntilChanged(), takeUntil(this.destroy$)).subscribe(val => {
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
  }

  ngAfterContentInit(): void {
  }

  ngAfterViewInit(): void {
    const positionStrategy = this.positionBuilder.connectedTo(this.btnFilter)
      .position(NbPosition.BOTTOM)
      .adjustment(NbAdjustment.CLOCKWISE)
      .withFlexibleDimensions(true)
      .offset(20);
    // const positionStrategy = this.positionBuilder.global().centerHorizontally().centerVertically();
    this.ref = this.overlay.create({positionStrategy, hasBackdrop: true});
    this.ref.backdropClick().pipe(takeUntil(this.destroy$)).subscribe(() => this.dismissOverlay());
    this.cdr.detectChanges();
  }

  dismissOverlay() {
    this.ref.detach();
  }

  ngOnInit() {
    this.chartConfigService.globalFilterObject.pipe(takeUntil(this.destroy$)).subscribe(res => {
      console.log('res !!!!!', res);
      if (this.charts[this.currentChartIdx] && res.linksChart && res.linksChart.indexOf(this.charts[this.currentChartIdx].chartId) !== -1) {
        this.filterObjectData = res
        if (res && this.chartViewerComponent) {
          this.chartViewerComponent.getChartResult(this.charts[this.currentChartIdx].chartId, res);
        }
      } else {
        return;
      }
    });
    this.initMenu();
    this.menuService.onItemClick()
      .pipe(
        takeUntil(this.destroy$),
        filter(({tag}) => tag === this.areaConfig.id),
        // map(({ item: { icon } }) => icon),
      )
      .subscribe((event: any) => {
          if (event.item.tag === 'expand') {
            // this.openChart(this.charts[this.currentChartIdx].chartId, this.chartViewerComponent.chartData.titleChart, this.chartViewerComponent.chartData.filterParams.TIMETYPE)
          }
          if (event.item.tag === 'warning') {
            this.openWarning()
          }
          if (event.item.tag === 'filter') {
            this.createOverlay()
          }
          if (event.item.tag === 'correlate') {
            console.log(this.filterObjectData)
            // this.openCorrelate()
          }
          if (event.item.tag === 'exportPNG' || event.item.tag === 'exportPDF' || event.item.tag === 'exportPNG' || event.item.tag === 'exportXLS') {
            let exportType = 'image/png';
            if (event.item.tag === 'exportPDF') {
              exportType = 'application/pdf';
            } else if (event.item.tag === 'exportXLS') {
              exportType = 'exportXLS';
            }
            const chartType = this.chartViewerComponent.chartSwitcherComponent.nativeChartData.chartType
            if (exportType === 'image/png' && chartType && (chartType === ChartType.ALARM_CHART || chartType === ChartType.CORRELATE_CHART || chartType === ChartType.OVERVIEW_CHART)) {
              const that = this;
              // this.divHeight = document.getElementById(this.areaConfig.id + '').offsetHeight;
              // this.divWidth = document.getElementById(this.areaConfig.id + '').offsetWidth;

              html2canvas(document.getElementById(this.areaConfig.id + ''), {
                removeContainer: true,
              }).then(function (canvas) {
                // Convert the canvas to blob
                canvas.toBlob(function (blob) {
                  const link = document.createElement('a');
                  const data = canvas.toDataURL('image/png').replace('image/jpeg', 'image/octet-stream')
                  // const downloadFile = new Blob([data])
                  link.href = data;
                  link.download = that.chartViewerComponent.chartData.chartCode + '.png'
                  link.click();
                  window.close()

                }, 'image/jpeg', 1);

              });
            } else {
              this.chartViewerComponent.chartSwitcherComponent.chartObject.exportChart(exportType);
            }
          }
        }
      );

    this.imageForm.valueChanges.subscribe(res => {
      if (res.imageBlob && res.imageUrl) {
        const ref = this.dialogService.open(WarningDialogComponent, {
          autoFocus: false,
          context: {
            imageChart: res.imageBlob,
            previewSignsrc: res.imageUrl,
            chartId: this.charts[this.currentChartIdx].chartId,
            screenId: this.areaConfig.screenId
          },
        });
        ref.onClose.subscribe(data => {
          // this.toasterService.pop('success', 'test', 'tết')
          console.log(data)
          if (data === 'success') {
            this.toasterService.pop('success', 'Thông báo', 'Gửi cảnh báo thành công')
            // this.onSucces('Gửi cảnh báo thành công')
          } else if (data === 'false') {
            this.toasterService.pop('warning', 'Thông báo', 'Gửi cảnh báo thành công')

            // this.onError('Gửi thông báo thất bại')
          }
        })
      }
    })
  }

  private fetchChart() {
    this.charts = this.areaConfig.mapCharts;
    this.currentChartIdx = 0;

    if (this.charts && this.charts.length > 1) {
      setInterval(() => {
        this.showChartNext();
      }, (this.areaConfig.timeRefresh && this.areaConfig.timeRefresh > 0 ? this.areaConfig.timeRefresh : 30) * 1000);
    }
  }

  goToScreen() {
    if (this.charts[this.currentChartIdx].screenIdNextto)
      this.router.navigate(['/pages/screen', this.charts[this.currentChartIdx].screenIdNextto]);
  }

  filterChart() {
    const fromDate = moment.isDate(this.filterChartForm.value.fromDate) ? moment(this.calToDate(this.filterChartForm.value.fromDate)).format('YYYYMMDD') : null;
    const toDate = moment.isDate(this.filterChartForm.value.toDate) ? moment(this.calToDate(this.filterChartForm.value.toDate)).format('YYYYMMDD') : null;
    if (this.filterObjectData) {
      this.filterObjectData.fromDate = fromDate;
      this.filterObjectData.toDate = toDate;
      this.filterObjectData.timeType = this.filterChartForm.value.timeType;
    } else {
      this.filterObjectData = {
        fromDate: fromDate,
        toDate: toDate,
        timeType: this.filterChartForm.value.timeType
      };
    }
    if (!this.chartViewerComponent.chartData.filterParams || !this.chartViewerComponent.chartData.filterParams.FROMDATE) {
      delete this.filterObjectData.fromDate;
    }
    this.chartViewerComponent.getChartResult(this.charts[this.currentChartIdx].chartId, this.filterObjectData);
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

  createOverlay() {
    if (this.ref.hasAttached()) {
      return;
    }

    this.ref.attach(new NbTemplatePortal(this.overlayTemplate, this.vcr));
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

  // openDialogInsertFavorite(even: any) {
  //   console.log('even', even);
  //   const pageName = even.chartName.replace(':TODATE', '').replace(':FROMDATE', '');
  //   const urlChart = window.location.origin + '/mic/show-chart/' + even.id;
  //   console.log(urlChart);
  //   const searchObject: object = {
  //     name: null,
  //     urlLink: urlChart,
  //   };
  //   this.favoriteService.findByUrl(searchObject).subscribe(res => {
  //     if (res.body) {
  //       this.dialogService.open(UpdateFavoriteComponent, {
  //         autoFocus: false,
  //         context: {
  //           favoriteBean: res.body,
  //         },
  //       });
  //     } else {
  //       this.dialogService.open(UpdateFavoriteComponent, {
  //         autoFocus: false,
  //         context: {
  //           name: pageName ? pageName : urlChart,
  //           urlLink: urlChart,
  //         },
  //       });
  //     }
  //   });
  // }

  loadDataChart(chatData: any) {
    if (this.isSlideShow) return;
    if (chatData && chatData.details && chatData.details.length > 0) {
      let kpiIds
      if (chatData.filterParams && chatData.filterParams.KPIIDS) {
        kpiIds = chatData.filterParams.KPIIDS
      } else
        kpiIds = chatData.details ? Array.from(new Set(chatData.details.map(i => {
          if (i.kpiInfos) {
            return i.kpiInfos.map(k => k.kpiId);
          }
        }).flat())) : null
      if (kpiIds) {
        this.catItemServiceService.getTimeTypesByKpi({
          kpiIds: kpiIds,
        }).subscribe(time => {
          this.timeTypes = time;
        })
        if (kpiIds.length === 1) {
          this.catItemServiceService.findWarnningByKpiId({
            kpiId: kpiIds[0],
            timeType: chatData.filterParams.TIMETYPE || chatData.timeTypeDefault
          }).subscribe(res => {
            this.warning = res.map(e => e.warningContent)
          })
        }
      }
    }
    if (chatData.filterParams && chatData.filterParams.TIMETYPE) {
      this.filterChartForm.get('timeType').patchValue(chatData.filterParams.TIMETYPE.toString());
    } else {
      this.filterChartForm.get('timeType').patchValue(chatData.timeTypeDefault.toString());
    }
    this.initMenu();
    // if (chatData.typeChart !== ChartType.CORRELATE_CHART && chatData.typeChart !== ChartType.OVERVIEW_CHART) {
    if (chatData.typeChart !== ChartType.CORRELATE_CHART) {
      this.items.push(
        {
          title: 'Tương quan',
          icon: {
            icon: 'bar-chart-2-outline',
            pack: 'eva'
          },
          tag: 'correlate'
        },
        {
          title: 'Tải PNG',
          icon: {
            icon: 'image-outline',
            pack: 'eva'
          },
          tag: 'exportPNG'
        }
      );
      if (chatData.typeChart !== ChartType.ALARM_CHART) {
        this.items.push(
          {
            title: 'Tải PDF',
            icon: {
              icon: 'file-outline',
              pack: 'eva'
            },
            tag: 'exportPDF'
          },
          {
            title: 'Tải XLS',
            icon: {
              icon: 'file-text-outline',
              pack: 'eva'
            },
            tag: 'exportXLS'
          }
        );
      }
    }
  }

  // openCorrelate() {
  //   const dataFilter = Object.assign({}, this.chartViewerComponent.chartData.filterParams)
  //   // dataFilter[]
  //   const kpiIds = Array.from(new Set(this.chartViewerComponent.chartData.details[0].data.map(e => e.KPI_ID)));
  //   const ref = this.dialogService.open(KpiReportDialogComponent, {
  //     autoFocus: false,
  //     context: {
  //       inputClass: 'dialogClass d-flex justify-content-center',
  //       isDialog: true,
  //       chartId: this.chartViewerComponent.chartData.id,
  //       filterObject: dataFilter
  //     },
  //   });
  // }

  // openChart(chartId, kpiName, timeType?: any) {
  //   if (!chartId) return;
  //   console.log(this.filterObjectData)
  //   const ref = this.dialogService.open(ViewChartDialogComponent, {
  //     autoFocus: false,
  //     context: {
  //       objectFilter: this.filterObjectData,
  //       chartId: chartId,
  //       kpiName: kpiName,
  //       title: kpiName,
  //       time: timeType
  //     },
  //   });
  // }

  // openChartRelation(chartIds) {
  //   if (!chartIds) return;
  //   const ref = this.dialogService.open(ShowRelationChartComponent, {
  //     autoFocus: false,
  //     context: {
  //       objectFilter: this.filterObjectData,
  //       chartIds: chartIds,
  //     },
  //   });
  // }

  onSucces(message) {
    this.toasterService.pop('success', 'Thông báo', message)
  }

  onError(message) {
    this.toasterService.pop('warning', 'Thông báo', message)

    // const iconConfig: any = {icon: 'checkmark-outline', pack: 'eva'};
    // this.toastrService.warning(message, 'Thông báo', iconConfig)
  }

  showChartNext() {
    this.currentChartIdx++;
    if (this.charts && this.currentChartIdx === this.charts.length)
      this.currentChartIdx = 0;
  }

  showChartPrev() {
    this.currentChartIdx--;
    if (this.currentChartIdx < 0 && this.charts)
      this.currentChartIdx = this.charts.length - 1;
  }

  openWarning() {
    const that = this;
    // this.divHeight = document.getElementById(this.areaConfig.id + '').offsetHeight;
    // this.divWidth = document.getElementById(this.areaConfig.id + '').offsetWidth;

    html2canvas(document.getElementById(this.areaConfig.id + ''), {
      removeContainer: true,
    }).then(function (canvas) {
      // Convert the canvas to blob
      canvas.toBlob(function (blob) {
        that.imageForm.patchValue({
          imageBlob: blob,
          imageUrl: canvas.toDataURL('image/png').replace('image/jpeg', 'image/octet-stream')
        })

      }, 'image/jpeg', 1);

    });
  }
}
