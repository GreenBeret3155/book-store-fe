import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AddModuleComponent} from './addModule/addModule.component';
import {ModuleService} from '../../../shared/services/module.service';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ConfirmDialogComponent} from '../../../share-lib-module/confirm-dialog/confirm-dialog.component';
import {TranslateService} from '@ngx-translate/core';
import {MapModuleComponent} from './map-module/map-module.component';
import { DashboardService } from '../../../shared/services/dashboard.service';
import {checkRoleAction} from '../../pages.component';

@Component({
  selector: 'ngx-module',
  styleUrls: ['./module.component.scss'],
  templateUrl: './module.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class ModuleComponent implements OnInit, AfterViewInit {
  dataParent;
  paramSearch = {
    id: null,
    code: null,
    name: null,
    description: null,
    status: null,
    tanentId: null,
    updateTime: null,
    parentId: null,
  };
  columns = [
    {name: 'module.index', prop: 'index', flexGrow: 0.3, isTree: false},
    {name: 'module.code', prop: 'code', flexGrow: 2.3, isTree: true},
    {name: 'module.name', prop: 'name', flexGrow: 1.4, isTree: false},
    {name: 'module.update_time', prop: 'updateTime', flexGrow: 1, isTree: false},
    {name: 'module.status', prop: 'status', flexGrow: 0.8, isTree: false},
    {name: 'module.url', prop: 'pathUrl', flexGrow: 1, isTree: false},
    {name: 'module.map_action', prop: 'map_action', flexGrow: 0.5, isTree: false},
    {name: 'module.tools', prop: 'action_btn', flexGrow: 0.8, isTree: false}
  ];
  rows;
  page = {
    limit: 10,
    count: 0,
    offset: 0,
  };
  listStatus: any[];
  checkboxColumns = {name: '', prop: 'checkbox', flexGrow: 0.2, isTree: false};
  selected: any[] = [];
  currentTheme: any = 'dark';

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  constructor(private moduleService: ModuleService,
    private dialogService: NbDialogService,
    private toastr: NbToastrService,
    private translate: TranslateService,
    private dashboardService: DashboardService) {
  }

  search() {
    this.moduleService.doSearch(this.paramSearch)
      .subscribe((res) => {
        this.rows = this.formatData(res.body, 0) || [] ;
      });
  }

  ngOnInit(): void {
    this.dashboardService.currentTheme.subscribe(e => {
      if (e && this.currentTheme !== e) {
        this.currentTheme = e
      }
    })
    this.search();
    this.getParent();
    this.initLstStatus();
    this.ngAfterViewInit();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      document.getElementById('module-code').focus();
    }, 100);
  }

  initLstStatus() {
    this.listStatus = [{'title': this.translate.instant('common.label.active'), 'value': '1'}, {
      'title': this.translate.instant('common.label.inActive'), 'value': '0'}];
  }

  formatData(data, parentId) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].parentId === parentId) {
        const children = this.formatData(data, data[i].id);
        if (children.length === 0) {
          data[i].treeStatus = 'disabled';
        }
        arr = arr.concat(children);
        arr.push(data[i]);
      }
    }
    return arr;
  }

  getParent() {
    this.moduleService.getParent().subscribe(data => this.dataParent = data.body);
  }

  open(data) {
    let title;
    if (data == null) {
      title = this.translate.instant('module.title_add');
    } else {
      title = this.translate.instant('module.title_edit');
    }
    this.dialogService.open(AddModuleComponent, {
      context: {
        title: title,
        data: data,
      },
      // dialogClass: 'modal-full',
      hasScroll: true,
    }).onClose.subscribe(
      value => {
        if (value) {
          if (data == null) {
            this.toastr.success(this.translate.instant('module.content_add_success'),
              this.translate.instant('common.notify.notification'));
          } else {
            this.toastr.success(this.translate.instant('module.content_edit_success'),
              this.translate.instant('common.notify.notification'));
          }
          this.search();
          this.getParent();
        }
      },
    );
  }

  delete(data) {
    this.showDeleteDialog(data).onClose.subscribe(res => {
      if (res) {
        this.moduleService.delete(data).subscribe(
          () => {
            this.toastr.success(this.translate.instant('module.delete_success'),
              this.translate.instant('common.notify.notification'));
            this.search();
          },
          (error) => {
            const checked = error.error ? error.error.title : undefined;
            if (checked) {
              this.toastr.danger(error.error.title,
                this.translate.instant('common.notify.error'));
            } else {
              this.toastr.danger(this.translate.instant('module.unknown_error'),
                this.translate.instant('common.notify.error'));
            }
          }
        )
        this.getParent();
      }
    })
  }

  onTreeAction(event: any) {
    const row = event.row;
    if (row.treeStatus === 'expanded') {
      row.treeStatus = 'collapsed';
    } else {
      row.treeStatus = 'expanded';
    }
    this.rows = [...this.rows];
  }

  openMapModule(data) {
    const openMap = this.dialogService.open(MapModuleComponent, {
      context: {
        title: this.translate.instant('module.title_map_module'),
        data: data,
      }
    })
    openMap.onClose.subscribe(value => {
      if (value) {
        this.toastr.success(this.translate.instant('module.content_map_action_success'),
          this.translate.instant('common.notify.notification'));
      }
    })
  }

  changeCheckboxStatus() {
    if (this.page.count === 0) {
      const temp = this.columns.find( e => e.prop === 'checkbox');
      if (temp) {
          const index = this.columns.indexOf(temp);
          this.columns.splice(index, 1);
      }
    } else {
      const temp = this.columns.find( e => e.prop === 'checkbox');
      if (!temp) {
          this.columns.unshift(this.checkboxColumns);
      }
    }
  }

  showDeleteDialog(data: any): any {
    return this.dialogService.open(ConfirmDialogComponent, {
      context: {
        message: this.translate.instant('module.message_delete') + ' ' + data.name,
      }
    });
  }

  multiDelete() {
    this.showDeleteDialog(undefined).onClose.subscribe(res => {
      if (res) {
        this.moduleService.multiDelete(this.selected).subscribe(() => {
          this.toastr.success(this.translate.instant('action.delete_action_success'), 'Thông báo');
          this.search();
        }, (err) => {
          this.toastr.danger(err.error.message, 'Lỗi');
        });
        this.selected = [];
      }
    })
  }

  check(roleAction: string) {
    // return true;
    return checkRoleAction(roleAction);
  }

  public onTreeAction2(event: any): void {
    const row = event;
    if (row.treeStatus === 'collapsed') {
        row.treeStatus = 'expanded';
    } else {
        row.treeStatus = 'collapsed';
    }
        // trigger a change detection
        this.rows = [...this.rows];
        // this._changeDetectorRef.detectChanges();
    }
}
