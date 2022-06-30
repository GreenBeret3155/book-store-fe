import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.state';
import { ModuleItemModel } from '../shared/model/module-item.model';
import { MenuService } from '../shared/services/admin/menu.service';

@Component({
  selector: 'ngx-admin-pages',
  templateUrl: './admin-pages.component.html',
  styleUrls: ['./admin-pages.component.scss']
})
export class AdminPagesComponent implements OnInit {

  moduleStore: Observable<ModuleItemModel[]>;
  constructor(private menuService: MenuService,
    private store: Store<AppState>,) {
    this.moduleStore = this.store.select('moduleItem');
  }

  menuItems: any[] = [];
  // [
  //   {
  //     title: 'Profile',
  //     expanded: true,
  //     children: [
  //       {
  //         title: 'Goes into angular `routerLink`',
  //         link: '/user-management', // goes into angular `routerLink`
  //         icon: 'plus-outline',
  //       },
  //       {
  //         title: 'Goes directly into `href` attribute',
  //         url: '/example/menu/menu-link-params.component#some-location', // goes directly into `href` attribute
  //       },
  //       {
  //         title: 'Menu item path match `prefix`',
  //         link: '/example/menu/menu-link-params.component',
  //         queryParams: {someUrlParam: 'true'},
  //         pathMatch: 'prefix',
  //       },
  //       {
  //         title: 'Will be opened in new window (target=`_blank`)',
  //         url: 'https://github.com/akveo/nebular',
  //         target: '_blank',
  //       },
  //       {
  //         title: 'Menu item with icon',
  //         link: '/admin-pages/user-management',
  //         icon: 'search-outline',
  //       },
  //       {
  //         title: 'Hidden menu item',
  //         link: '',
  //         hidden: true,
  //       },
  //     ],
  //   },
  //   {
  //     title: 'Shopping Bag',
  //     children: [
  //       {
  //         title: 'First Product',
  //       },
  //       {
  //         title: 'Second Product',
  //       },
  //       {
  //         title: 'Third Product',
  //       },
  //     ],
  //   },
  //   {
  //     title: 'Orders',
  //     children: [
  //       {
  //         title: 'First Order',
  //       },
  //       {
  //         title: 'Second Order',
  //       },
  //       {
  //         title: 'Third Order',
  //       },
  //     ],
  //   },
  // ];

  ngOnInit() {
    this.moduleStore.subscribe(e => {
      const moduleItems = this.menuService.transformModuleItems(e);
      console.log(moduleItems);
      this.menuItems = moduleItems;
    })
  }

}
