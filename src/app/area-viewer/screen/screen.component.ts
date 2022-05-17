import {
  AfterContentChecked,
  AfterContentInit, AfterViewChecked, AfterViewInit,
  Component, ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  Output,
  SimpleChanges, ViewChild
} from '@angular/core';
import {
  GridsterComponentInterface,
  GridsterConfig,
  GridsterItem,
  GridsterItemComponentInterface
} from 'angular-gridster2';
import {NbSidebarService} from '@nebular/theme';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {debounceTime, flatMap, takeUntil} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {ToasterConfig} from 'angular2-toaster';
import {of, Subject} from 'rxjs';

import {HttpResponse} from '@angular/common/http';
import {DashboardService} from '../../shared/services/dashboard.service';
import {ConfigMenuService} from '../../shared/services/config-menu.service';
import {ChartConfigService} from '../../shared/services/chart-config.service';


@Component({
  selector: 'ngx-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  fullScreen: boolean;
  toasterConfig: ToasterConfig = new ToasterConfig({
    animation: 'flyRight',
    newestOnTop: true,
  });
  @Input() screenData: any;
  @Input() redraw: EventEmitter<any>;
  @Input() menuCollapsed: any;
  @Output() collapseMenu = new EventEmitter();
  @Output() onChangeGroup = new EventEmitter();
  @Input() screenId: any;
  options: GridsterConfig;
  areas: Array<GridsterItem>;
  groupCharts: any = [];
  filterForm: FormGroup = this.fb.group({
    groupChart: null,
    fromDate: null,
    toDate: null
  });
  showFilter: boolean;
  openSearchBar = false;
  @Input() overview: any;
  curentSearchChart: HTMLElement;
  page = 0;
  pageSize;
  totalAras: any = [];
  showMapButton: boolean = false;
  fragment: any;
  lstTabs: any = [];
  curentTabs: any = [];
  @ViewChild('divElement', {static: false}) divElement;
  @ViewChild('divElement1', {static: false}) divElement1;
  showTabs: boolean = true;
  tabPanel: any;
  containerScreen: any;
  timerScreen;
  private destroy$ = new Subject();

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log('a22', event);
    this.options.setGridSize = false;
    this.changedOptions();
    this.options.setGridSize = true;
    this.changedOptions();
  }

  constructor(private dashboardService: DashboardService, private sidebarService: NbSidebarService,
              protected router: Router,
              private route: ActivatedRoute,
              private configMenuService: ConfigMenuService,
              private elementRef: ElementRef,
              private fb: FormBuilder, private chartConfigService: ChartConfigService) {
    this.dashboardService.openSearchBar.subscribe(res => {
      this.openSearchBar = !this.openSearchBar;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  private fetchData() {
    if (this.options) {
      this.changedOptions();
    }
    this.pageSize = this.screenData && this.screenData.pageSize ? this.screenData.pageSize : 6;
    this.dashboardService.getGroupChart(this.screenData.id).pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.groupCharts = res;
    });
    this.totalAras = this.screenData.configAreaDTOs.map(data => {
      const d = Object.assign({}, data);
      delete d.positionJson;
      return {
        ...JSON.parse(data.positionJson),
        dragEnabled: false,
        resizeEnabled: false,
        areaData: {...d}
      };
    });
    // if (this.screenData.isDefault === 1) {
    //   this.areas = JSON.parse(JSON.stringify(this.totalAras.slice(this.page * this.pageSize, this.pageSize)));
    // } else {
    //   this.areas = this.totalAras.map(e => e);
    // }
    this.areas = this.totalAras.map(e => e);
    this.filterForm.get('groupChart').valueChanges.subscribe(value => {
      this.onChangeGroup.emit(this.groupCharts.find(e => e.id === value));
      this.areas = [];
      this.dashboardService.queryGroupScreen(this.screenData.id, value).subscribe(gr => {
        this.areas = gr.configAreaDTOs.filter(e => (e.mapCharts.length > 0)).map(data => {
          const d = Object.assign({}, data);
          delete d.positionJson;
          return {
            ...JSON.parse(data.positionJson),
            dragEnabled: false,
            resizeEnabled: false,
            areaData: {...d}
          };
        });
      });
    });
  }

  showAndHideTabs() {
    this.showTabs = this.showTabs ? false : true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.screenData && changes.screenData.currentValue) {
      if (this.screenId) {
        this.dashboardService.find(this.screenId).pipe(
          flatMap((res: HttpResponse<any>) => {
            if (res.body) {
              this.dashboardService.currentScreen.next(res.body);
              if (res.body.menuItem) {
                return this.configMenuService.find(res.body.menuItem.menuId, {profileIds: res.body.profileId}).pipe(flatMap((d: any) => {
                  res.body.menuItemData = d.body;
                  this.configMenuService.currentMenuItems = d.body;
                  this.configMenuService.currentMenuItemId.next(res.body.menuItem.menuId);
                  return of(res.body);
                }));
              }
              return of(res.body);
            }
          })).subscribe(res => {
          console.log(res)
          this.screenData = res;
          this.fetchData();
        })
      }
      this.fetchData();
      if (this.filterForm.get('groupChart')) {
        this.filterForm.get('groupChart').patchValue(null, {emitEvent: false});
      }
      if (this.screenData.profileType === 2) {
        this.fullScreen = true;
        console.log('this.screenData', this.screenData);
        if (this.screenData.isDefault === 1) {
          this.dashboardService.getListTabs({
            profileId: this.screenData.profileId
          }).subscribe(res => {
            if (res.body && res.body.length > 0) {
              this.lstTabs = res.body;
              this.curentTabs = this.lstTabs;
            }
          });
        } else {
          this.dashboardService.getTabsForScreen({
            profileId: this.screenData.profileId,
            curentScreenId: this.screenData.id,
            parentId: this.screenData.parentId
          }).subscribe(res => {
            if (res.body && res.body.length > 0) {
              this.lstTabs = [];
              res.body.forEach(ite => {
                this.lstTabs.push(ite);
              });
              this.curentTabs = this.lstTabs;
              console.log('this.lstTabs child', this.lstTabs);
            } else {
              this.lstTabs = this.curentTabs;
            }
          });
        }
      }
    }
  }

  hideFilterPanel(): void {
    const filterPanel = document.getElementById('#filterPanel');
    if (this.showFilter) {
      this.showFilter = true;
    } else {
      this.showFilter = true;
    }
  }


  ngOnInit(): void {
    if (this.screenData && this.screenData.profileType === 2) {
      this.fullScreen = true;
    }
    if (this.screenId) {
      this.dashboardService.find(this.screenId).pipe(
        flatMap((res: HttpResponse<any>) => {
          if (res.body) {
            this.dashboardService.currentScreen.next(res.body);
            if (res.body.menuItem) {
              return this.configMenuService.find(res.body.menuItem.menuId, {profileIds: res.body.profileId}).pipe(flatMap((d: any) => {
                res.body.menuItemData = d.body;
                this.configMenuService.currentMenuItems = d.body;
                this.configMenuService.currentMenuItemId.next(res.body.menuItem.menuId);
                return of(res.body);
              }));
            }
            return of(res.body);
          }
        })).subscribe(res => {
        console.log(res)
        this.screenData = res;
        this.fetchData()
      })
    }
    console.log('screenData', this.screenData);
    this.route.fragment.subscribe(fragment => {
      this.fragment = fragment;
    });
    if (this.redraw) {
      this.redraw.subscribe(() => {
        this.options.setGridSize = false;
        this.changedOptions();
        this.options.setGridSize = true;
        this.changedOptions();
      });
    }
    // Grid options
    this.options = {
      initCallback: this.gridInit,
      draggable: {
        ignoreContent: true,
        enabled: false
      },
      resizable: {
        enabled: false,
      },
      // gridType: (this.screenData.isDefault !== 1) ? 'scrollVertical' : 'fit',
      gridType: 'scrollVertical',
      compactType: 'compactUp&Left',
      // maxCols: 24,
      defaultItemCols: 1,
      defaultItemRows: 1,
      // fixedColWidth: 150,
      // fixedRowHeight: 150,
      maxRows: 1000,
      maxItemRows: 1000,
      keepFixedHeightInMobile: true,
      setGridSize: true,
      // setGridSize: (this.screenData.isDefault !== 1),
      outerMargin: false
    };
    this.showFilter = true;
    this.checkShowButtonMap();
    this.dashboardService.currentProfile.pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (res && res.id && this.screenData) {
        this.screenData.profileId = res.id;
        this.checkShowButtonMap();
      }
    });

  }


  gridInit(grid: GridsterComponentInterface): void {
  }

  changedOptions() {
    if (this.options && this.options.api) {
      this.options.api.optionsChanged();
    }
  }

  search() {
    const fromDate = this.filterForm.get('fromDate').value ? moment(this.filterForm.get('fromDate').value).format('YYYYMMDD') : null;
    const toDate = this.filterForm.get('toDate').value ? moment(this.filterForm.get('toDate').value).format('YYYYMMDD') : null;
    this.chartConfigService.globalFilterObject.next({fromDate, toDate});
  }

  openOverView() {
    if (this.overview && this.overview.id) {
      this.router.navigate(['/pages/screen/', this.overview.id]);
    }
  }

  checkShowButtonMap() {
    if (this.screenData)
    this.chartConfigService.getScreenMapId(this.screenData.profileId).pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (res && res.body) {
        this.showMapButton = true;
      } else {
        this.showMapButton = false;
      }
    })
  }

  openChartMap() {
    this.chartConfigService.getScreenMapId(this.screenData.profileId).pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (res && res.body) {
        this.router.navigate(['/pages/screen', res.body]);
      }
      // this.showFilter = false;
      this.dashboardService.openSearchBar.next();
    })
  }

  changePage(number: number) {
    this.page = this.page + number;
    if (this.page < 0) {
      this.page = 0;
    }
    if (this.page > Math.ceil(this.totalAras.length / this.pageSize) - 1) {
      this.page = Math.ceil(this.totalAras.length / this.pageSize) - 1;
    }
    const from = this.page * this.pageSize;
    const to = (this.page + 1) * this.pageSize;
    this.areas = this.totalAras.slice(from, to);
  }

  checkTitle(value: any) {
    return this.groupCharts.find(e => e.id === value) ? this.groupCharts.find(e => e.id === value).groupName : ''
  }

  ngAfterViewInit() {
    this.route.fragment.pipe(takeUntil(this.destroy$)).subscribe(fragment => {
      this.fragment = fragment;
      setTimeout(() => this.scrollToAnchor(), 3000);
    });
    this.containerScreen = document.getElementById('container-screen');
    if (this.containerScreen)
    this.containerScreen.addEventListener('mousemove', function (e) {
      // console.log('even', e);
      this.tabPanel = document.getElementById('tab-panel');
      this.showTabs = document.getElementById('close-form-status')['value'];
      clearTimeout(this.timerScreen);
      if (this.showTabs && this.tabPanel && e.clientY <= 100) {
        this.tabPanel.style.display = '';
      } else {
        this.tabPanel.style.display = 'none';
      }
      this.timerScreen = setTimeout(function () {
        this.tabPanel = document.getElementById('tab-panel');
        if (this.tabPanel) {
          this.tabPanel.style.display = 'none';
        }
      }, 3000);
    });
  }

  scrollToAnchor(): void {
    try {
      if (this.curentSearchChart) {
        this.curentSearchChart.className = this.curentSearchChart.className.replace('active-area', '');
      }
      if (this.fragment) {
        this.curentSearchChart = document.getElementById(this.fragment);
        if (this.curentSearchChart) {
          this.curentSearchChart.className += ' active-area';
          this.curentSearchChart.scrollIntoView(true);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}

