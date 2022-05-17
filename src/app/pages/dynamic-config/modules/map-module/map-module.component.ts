import {Component, OnInit} from '@angular/core';
import {
  DimensionsHelper,
  ScrollbarHelper,
  ColumnChangesService
} from '@swimlane/ngx-datatable';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {TranslateService} from '@ngx-translate/core';
import {ActionService} from '../../../../shared/services/action.service';
import {ModuleActionService} from '../../../../shared/services/module-action.service';
import {DashboardService} from '../../../../shared/services/dashboard.service';

@Component({
  selector: 'ngx-map-module',
  templateUrl: './map-module.component.html',
  styleUrls: ['./map-module.component.scss'],
  providers: [ScrollbarHelper, DimensionsHelper, ColumnChangesService],
})
export class MapModuleComponent implements OnInit {
  title: string;
  data: any;
  paramSearch = {code: null}
  columns = [
    {prop: 'selected', name: '', flexGrow: 0.3, headerCheckboxable: true, checkboxable: true},
    {prop: 'index', name: 'module.map_module.index', flexGrow: 0.2, headerCheckboxable: false, checkboxable: false},
    {prop: 'code', name: 'module.map_module.code', flexGrow: 1, headerCheckboxable: false, checkboxable: false},
    {prop: 'name', name: 'module.map_module.name', flexGrow: 1, headerCheckboxable: false, checkboxable: false},
    {prop: 'updateTime', name: 'module.map_module.update_time', flexGrow: 1, headerCheckboxable: false, checkboxable: false},
    {prop: 'status', name: 'module.map_module.status', flexGrow: 1, headerCheckboxable: false, checkboxable: false}
  ];
  rows;
  selectedUI = [];
  selected = [];
  originalData = [];
  currentTheme: any = 'dark';


  constructor(private ref: NbDialogRef<MapModuleComponent>,
              private toastr: NbToastrService,
              private translate: TranslateService,
              private actionService: ActionService,
              private dashboardService: DashboardService,
              private moduleActionService: ModuleActionService) {
  }

  protected onSuccess(data: any | null): void {
    this.rows = data || [];
    this.selectedUI = [];
    this.selected.map(value => {
      this.rows.map((value1) => {
        if (value === value1.id) {
          this.selectedUI.push(value1);
        }
      })
    })
  }

  ngOnInit(): void {
    this.dashboardService.currentTheme.subscribe(e => {
      if (e && this.currentTheme !== e) {
        this.currentTheme = e
      }
    })
    this.moduleActionService.getAllByModuleId({id: this.data.id}).subscribe(
      data => {
        this.originalData = data.body;
        data.body.map(value => {
          this.selected.push(value.actionId);
        });
      },
      (error) => this.toAstrError(error),
      () => this.search(),
    )
  }

  toAstrError(error : any) {
    this.toastr.danger(error.error.title, this.translate.instant('common.notify.error'));
  }

  onSelect({selected}) {
    this.selectedUI = [];
    this.selectedUI.push(...selected);
    this.rows.map((value) => {
      this.selected.map((value1, index) => {
        if (value.id === value1) {
          this.selected.splice(index, index + 1);
        }
      })
    })
    selected.map(value => this.selected.push(value.id));
  }



  search() {
    this.actionService.getActionTableMap(this.paramSearch)
      .subscribe(res => this.onSuccess(res.body));


  }


  submit() {
    const listUncheck = [];
    const listAdd = [];
    this.originalData.map(value => {
      let isUncheck = true;
      this.selected.map((select, index) => {
        if (value.actionId === select) {
          this.selected.splice(index,1);
          isUncheck = false;
        }
      })
      if (isUncheck) {
        listUncheck.push(value);
      }
    })
    this.selected.map(value => {
      listAdd.push({moduleId: this.data.id, actionId: value})
    })
    this.moduleActionService.delete(listUncheck).subscribe(
      () => {
        this.moduleActionService.insert(listAdd).subscribe(
          () => this.ref.close('success'),
          (error) => this.toAstrError(error),
        )
      },
      (error) => this.toAstrError(error),
    )
  }

  cancel() {
    this.ref.close();
  }
}
