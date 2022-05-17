import {Component} from '@angular/core';
import {NbSidebarService} from '@nebular/theme';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
      <nb-layout windowMode>
          <nb-layout-header fixed>
              <ngx-header></ngx-header>
          </nb-layout-header>
          <nb-sidebar
                  (mouseenter)="open()"
                  (mouseleave)="close()"
                  [compactedBreakpoints]="['xxxl']"
                  [collapsedBreakpoints]="['xl', 'xs','md','lg','xxl','xxxl','sm','is']" class="menu-sidebar"
                  tag="menu-sidebar"
                  responsive="true" state="collapsed">
              <ng-content select="nb-menu"></ng-content>
          </nb-sidebar>
<!--        <nb-sidebar class="menu-sidebar"-->
<!--                    tag="menu-right"-->
<!--                    right fixed-->
<!--                    [compactedBreakpoints]="['xxxl']"-->
<!--                    [collapsedBreakpoints]="['xl', 'xs','md','lg','xxl','xxxl','sm','is']"-->
<!--                    responsive="true" state="collapsed">-->
<!--&lt;!&ndash;          <ng-content select="ngx-menu-report"></ng-content>&ndash;&gt;-->
<!--          <ngx-menu-report></ngx-menu-report>-->
<!--        </nb-sidebar>-->
          <nb-layout-column>
              <ngx-bread-crumb></ngx-bread-crumb>
              <ng-content select="router-outlet"></ng-content>
          </nb-layout-column>

          <nb-layout-footer fixed>
              <ngx-footer></ngx-footer>
          </nb-layout-footer>
      </nb-layout>
  `,
})
export class OneColumnLayoutComponent {

  constructor(private sidebarService: NbSidebarService) {
  }

  close() {
    this.sidebarService.collapse('menu-sidebar');
  }

  open() {
    this.sidebarService.expand('menu-sidebar');
  }
}
