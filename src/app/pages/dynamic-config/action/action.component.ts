import {AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {AddActionComponent} from './addAction/addAction.component';
import {ActionService} from '../../../shared/services/action.service';
import {TranslateService} from '@ngx-translate/core';
import {ConfirmDialogComponent} from '../../../share-lib-module/confirm-dialog/confirm-dialog.component';
import {HttpHeaders} from '@angular/common/http';
import { DashboardService } from '../../../shared/services/dashboard.service';
// import {checkRoleAction, role} from "../../../pages.component";
import { FormControl, FormGroup } from '@angular/forms';
import { trimRequired } from '../../validator';
import { Validators } from '@angular/forms';
import {checkRoleAction} from '../../pages.component';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-action',
  styleUrls: ['./action.component.scss'],
  templateUrl: './action.component.html',
})
export class ActionComponent implements OnInit, OnDestroy, AfterViewInit {
  source = [];
  loading = false;
  paramSearch = {
    id: null,
    code: null,
    name: null,
    description: null,
    status: null,
    tanentId: null,
    updateTime: null,
  };
  rows: Object[];
  lstStatus: any[];
  page = {
    limit: 10,
    count: 0,
    offset: 0,
  };
  columns = [
    {name: 'action.index', prop: 'index', flexGrow: 0.3},
    {name: 'action.code', prop: 'code', flexGrow: 1.5},
    {name: 'action.name', prop: 'name', flexGrow: 1.5},
    {name: 'action.status', prop: 'status', flexGrow: 0.8},
    {name: 'action.updateTime', prop: 'updateTime', flexGrow: 0.8},
    {name: 'action.tools', prop: 'action_btn', flexGrow: 0.6}
  ];
  checkboxColumns = {name: '', prop: 'checkbox', flexGrow: 0.2};
  selected: any[] = [];
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  inputSearch: FormGroup ;
  currentTheme: any = 'dark';

  constructor(
    private translateService: TranslateService,
    private toastr: NbToastrService,
    private actionService: ActionService,
    private dialogService: NbDialogService,
    private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.dashboardService.currentTheme.subscribe(e => {
      if (e && this.currentTheme !== e) {
        this.currentTheme = e
      }
    })
    this.search(this.page.offset);
    this.initLstStatus();
    this.ngAfterViewInit();
  }

  initLstStatus() {
    this.lstStatus = [{'title': this.translateService.instant('common.label.active'), 'value': '1'}, {
      'title': this.translateService.instant('common.label.inActive'),
      'value': '0'
    }];
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      document.getElementById('action-code').focus();
    }, 100);
  }

  ngOnDestroy(): void {

  }

  pageCallback(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number }) {
    this.search(pageInfo.offset);
  }

  protected onSuccess(data: any | null, headers: HttpHeaders, page: number): void {
    this.page.count = Number(headers.get('X-Total-Count'));
    this.page.offset = page || 0;
    this.rows = data || [];
    this.changeCheckboxStatus();
    this.selected = [];
  }

  getError(control: string) {
    const key = Object.keys(this.inputSearch.get(control).errors).shift();
    return this.getValueActionError(control, key);
  }

  getValueActionError(control, key) {
    return this.translateService.instant('action.errorForm.' + control + '.' + key);
  }

  search(page: number) {
    this.loading = true;
    this.page.offset = page;
    this.validateSearchParam()
    this.actionService.doSearch(this.paramSearch, {
        page: this.page.offset,
        size: this.page.limit
      }
    ).subscribe(
      (res) => this.onSuccess(res.body, res.headers, this.page.offset),
      (error) => {
        this.loading = false;
      },
      () => this.loading = false,
    );
  }

  open(data) {
    let title;
    if (data == null) {
      title = this.translateService.instant('action.title_add');
    } else {
      title = this.translateService.instant('action.title_edit');
    }
    this.dialogService.open(AddActionComponent, {
      context: {
        title: title,
        data: data,
      },
      // dialogClass: 'modal-full',
      hasScroll: true,
    }).onClose.subscribe(
      value => {
        if (value) {
          this.search(this.page.offset);
          if (data == null) {
            this.toastr.success(this.translateService.instant('action.add_action_success'),
              this.translateService.instant('common.notify.notification')
            );
          } else {
            this.toastr.success(this.translateService.instant('action.edit_action_success'),
              this.translateService.instant('common.notify.notification')
            );
          }
        }
      },
    );
  }

  delete(data) {
    this.showDeleteDialog().onClose.subscribe(
      (res) => {
        if (res) {
          this.actionService.delete(data).subscribe(
            () => {
              this.toastr.success(this.translateService.instant('action.delete_action_success'),
                this.translateService.instant('common.notify.notification')
              );
              this.search(this.page.offset);
            },
            (error) => {
              let checked = error.error ? error.error.title : undefined;
              if (checked) {
                this.toastr.danger(error.error.title,
                  this.translateService.instant('action.error'));
              } else {
                this.toastr.danger(this.translateService.instant('action.unknown_error'),
                  this.translateService.instant('action.error'));
              }
            }
          )
        }
      }
    )
  }

  check(roleAction: string) {
    // return true;
    return checkRoleAction(roleAction);
  }

  multiDelete() {
    this.showDeleteDialog().onClose.subscribe(res => {
      if (res) {
        this.actionService.multiDelete(this.selected).subscribe(() => {
          this.toastr.success(this.translateService.instant('action.delete_action_success'), 'Thông báo');
          this.search(this.page.offset);
        }, (err) => {
          this.toastr.danger(err.error.message, 'Lỗi');
        })
        this.selected = [];
      }
    })
  }

  showDeleteDialog(): any{
    return this.dialogService.open(ConfirmDialogComponent, {
      autoFocus: true,
      context: {
        message: this.translateService.instant('action.content_delete')
      },
    });
  }

  changeCheckboxStatus(){
    if( this.page.count === 0){
      let temp = this.columns.find( e => e.prop === 'checkbox');
      if(temp){
          const index = this.columns.indexOf(temp);
          this.columns.splice(index, 1);
      }
    }else{
      let temp = this.columns.find( e => e.prop === 'checkbox');
      if(!temp){
          this.columns.unshift(this.checkboxColumns);
      }
    }
  }
  validateSearchParam() {
    if(this.paramSearch) {
      this.inputSearch = new FormGroup({
        id: new FormControl(this.paramSearch.id, []),
        code: new FormControl(this.paramSearch.code, [trimRequired, Validators.maxLength(200)]),
        name: new FormControl(this.paramSearch.name, [trimRequired, Validators.maxLength(300)]),
        description: new FormControl(this.paramSearch.description, [trimRequired, Validators.maxLength(500)]),
        status: new FormControl(this.paramSearch.status, []),
        tanentId: new FormControl(this.paramSearch.tanentId, []),
        updateTime: new FormControl(this.paramSearch.updateTime, []),
      });
    } else{
      this.inputSearch = new FormGroup(this.paramSearch);
    }
  }
}

