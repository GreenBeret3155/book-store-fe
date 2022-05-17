import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {NbMenuItem, NbMenuService} from '../menu-custom/menu.service';
import {LoginService} from '../@core/login/login.service';
import {ShareService} from '../@core/mock/share.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {AccountService} from '../@core/auth/account.service';
import {ConfigMenuService} from '../shared/services/config-menu.service';
import { DashboardService } from '../shared/services/dashboard.service';
import { forkJoin } from 'rxjs';
import { ReportService } from '../shared/services/report.service';
import { NbSidebarService, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="items" [tag]="'main-sidebar-menu'" [autoCollapse]="true"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {
  constructor(private loginService: LoginService,
              private router: Router,
              private shareService: ShareService,
              private $localStorage: LocalStorageService,
              private $sessionStorage: SessionStorageService,
              private menuService: NbMenuService, private accountService: AccountService, private dashboardService: DashboardService,
                          private reportService: ReportService, protected dialogService: NbDialogService,
                          private sidebarService: NbSidebarService,  private menuConfigService: ConfigMenuService) {

  }

  // formatListPractices(data, paren) {
  //   const arr = [];
  //   for (let i = 0; i < data.length; i++) {
  //     const dataItem = data[i];
  //     if (dataItem.parenId === paren) {
  //       const children = this.formatListPractices(data, dataItem.id);
  //       if (children.length > 0) {
  //         dataItem.link  = null;
  //         dataItem.children = children;
  //       }
  //       arr.push(dataItem);
  //     }
  //   }
  //   return arr;
  // }

  formatListPractices(data, paren) {

    const arr = [];
    for (let i = 0; i < data.length; i++) {
      const dataItem = data[i];
      const item = new NbMenuItem();
      item.title = dataItem.title;
      item.icon = dataItem.icon;
      item.link =  dataItem.link;
      item.role = dataItem.role;
      if (dataItem.parenId === paren) {
        const children = this.formatListPractices(data, dataItem.id);
        if (children.length > 0) {
          // dataItem.link  = null;
          item.link = null;
          item.children = children;
          // dataItem.children = children;
        }
        arr.push(item);
      }
    }
    return arr;
  }

  menu: Array<any> = [];
  home: Object;
  obj: any;
  items: NbMenuItem[] = [];
  ngOnInit(): void {
    this.menuService.onItemSelect().subscribe((event) => {
      role = [];
      role.push( event.item);
      this.shareService.changeMessage(event.item);
    });

    this.menu = [];
    this.home = {
      title: 'Trang chủ',
      icon: 'home-outline',
      link: '/pages/dashboard',
    };
    // this.menu.push(this.home);
    let menu1;
    try {
      const token = this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken') || '';
      if (token.trim().length === 0 && token === null) {
        this.$localStorage.store('lstObjects', null);
        this.$sessionStorage.store('lstObjects', null);
      } else {
        this.loginService.authenticationcate({}).subscribe(res => {
          if (res.status === 200) {
            // this.obj = this.$localStorage.retrieve('lstObjects') || this.$sessionStorage.retrieve('lstObjects') || '';
            this.obj = res.body.listObjects;
            this.$localStorage.store('lstObjects', this.obj);
            this.$sessionStorage.store('lstObjects', this.obj);
            menu1 = this.formatListPractices(this.obj, 0);
            for (let i = 0; i < menu1.length; i++) {
              this.menu.push(menu1[i]);
            }
            this.items = [...this.items, ...this.menu];
          }
        }, err => {
          localStorage.clear();
          this.router.navigate(['auth/login']);

        });
        this.dashboardService.currentProfile.subscribe(res => {
          this.items = [];
          this.items = [...this.items, ...this.menu];
          if (res) {
            const queryCustomerTypes = [this.reportService.findKpi(), this.reportService.query({
              status: 1,
              page: 0,
              size: 20000000
            }), this.menuConfigService.getMenuByProfileId(res.id)];
            forkJoin(queryCustomerTypes).subscribe((dataRes: any) => {
              const data = []
              const results = new NbMenuItem();
              results.title = 'Báo cáo';
              results.icon = 'folder-outline';
              const result = dataRes[0].body.map(e => {
                const item = new NbMenuItem();
                item.title = e.text;
                item.icon = 'folder-outline';
                // item.className = e.menuCode;
                // console.log('e.menuCode', e.menuCode);
                const children = e.children.map(sub => {
                  const si = new NbMenuItem();
                  si.title = sub.text;
                  si.children = sub.children
                  si.children.push(dataRes[1].body.filter(a => {
                    if (a && a.categoryId === sub.baseObject.id) {
                      return a
                    }
                  }))
                  si.link = '';
                  si.icon = 'folder-outline';
                  return si;
                });
                // const defaultChild = e.items.find(d => d.isDefault === 1);
                item.link = '';
                item.children = children;
                const reportData = dataRes[1].body.filter(a => {
                  if (a && a.categoryId === e.baseObject.id) {
                    return a
                  }
                }).map(dRes => {
                  if (dRes) {
                    return {
                      title: dRes.name,
                      icon: 'file-text-outline',
                      link: `${dRes.code ? '/pages/report/' + dRes.code : ''}`,
                      children: null
                    }
                  }
                })
                if (reportData)
                  item.children = [...item.children, ...reportData]
                // console.log('item....', item);
                return item;
              });
              // const result = res.body;
              // console.log(res.body);
              // this.updateObject(result)
              // console.log(this.updateObject(result))
              results.children = result
              data.push(results)
              // this.menu = [...this.menu, ...data];
              this.items = [...this.items, ...data];

                      if (dataRes[2]) {
                        const result3 = dataRes[2].map(e => {
                          const item = new NbMenuItem();
                          item.title = e.menuName;
                          item.icon = 'pie-chart-outline';
                          item.className = e.menuCode;
                          // console.log('e.menuCode', e.menuCode);
                          const children = e.items.map(sub => {
                            const si = new NbMenuItem();
                            si.title = sub.menuItemName;
                            si.link = `${sub.screenIds ? '/pages/screen/' + sub.screenIds[0] : ''}`;
                            si.icon = 'chevron-right-outline';
                            return si;
                          });
                          const defaultChild = e.items.find(d => d.isDefault === 1);
                          item.link = defaultChild ? `${defaultChild.screenIds ? '/pages/screen/' + defaultChild.screenIds[0] : ''}` : null;
                          item.children = children;
                          return item;
                        });
                        this.items = [...this.items, ...result3];
                      }
            });
          }
        });
      }
    } catch (e) {
      this.$localStorage.store('lstObjects', null);
      this.$sessionStorage.store('lstObjects', null);
    }
  }

}

export let  role = [];

export function checkRoleAction(roleAction: string) {
  for (let i = 0; i < role[0].role.length; i++) {
    if (role[0].role[i].codeAction === roleAction) {
      return true;
    }
  }
  return false;
};

  // menu = Object.assign([], MENU_ITEMS);
  // originMenu = Object.assign([], MENU_ITEMS);
  // account;
  // temp: any;
  // profileId;
  // constructor(private accountService: AccountService, private dashboardService: DashboardService,
  //             private reportService: ReportService, private _hotkeysService: HotkeysService, protected dialogService: NbDialogService,
  //             private sidebarService: NbSidebarService, private menuService: NbMenuService, private menuConfigService: ConfigMenuService,
  //             private router: Router) {
  //   //   this.accountService.identity().subscribe(account => {
    //
    //     const roles = Object.keys(AuthoritiesConstant);
    //     roles.forEach(role => {
    //       if (!this.accountService.hasAnyAuthority([role])) {
    //         this.menu = this.menu.filter(e => {
    //           return (!e.data || !e.data.role || e.data.role.indexOf(role) === -1);
    //         })
    //       }
    //     })
    //   });
    //
    //   this.dashboardService.currentProfile.subscribe(res => {
    //     this.getAllResources();
    //     if (res) {
    //       this.profileId = res.id;
    //       this.menu = Object.assign([], this.originMenu)
    //       const queryCustomerTypes = [this.reportService.findKpi(), this.reportService.query({
    //         status: 1,
    //         page: 0,
    //         size: 20000000
    //       }) , this.menuConfigService.getMenuByProfileId(res.id)];
    //       forkJoin(queryCustomerTypes).subscribe((dataRes: any) => {
    //         const data = []
    //         const results = new NbMenuItem();
    //         results.title = 'Báo cáo';
    //         results.icon = 'folder-outline';
    //         const result = dataRes[0].body.map(e => {
    //           const item = new NbMenuItem();
    //           item.title = e.text;
    //           item.icon = 'folder-outline';
    //           // item.className = e.menuCode;
    //           // console.log('e.menuCode', e.menuCode);
    //           const children = e.children.map(sub => {
    //             const si = new NbMenuItem();
    //             si.title = sub.text;
    //             si.children = sub.children
    //             si.children.push(dataRes[1].body.filter(a => {
    //               if (a && a.categoryId === sub.baseObject.id) {
    //                 return a
    //               }
    //             }))
    //             si.link = '';
    //             si.icon = 'folder-outline';
    //             return si;
    //           });
    //           // const defaultChild = e.items.find(d => d.isDefault === 1);
    //           item.link = '';
    //           item.children = children;
    //           const reportData = dataRes[1].body.filter(a => {
    //             if (a && a.categoryId === e.baseObject.id) {
    //               return a
    //             }
    //           }).map(dRes => {
    //             if (dRes) {
    //               return {
    //                 title: dRes.name,
    //                 icon: 'file-text-outline',
    //                 link: `${dRes.code ? '/pages/report/' + dRes.code : ''}`,
    //                 children: null
    //               }
    //             }
    //           })
    //           if (reportData)
    //             item.children = [...item.children, ...reportData]
    //           // console.log('item....', item);
    //           return item;
    //         });
    //         // const result = res.body;
    //         // console.log(res.body);
    //         // this.updateObject(result)
    //         // console.log(this.updateObject(result))
    //         results.children = result
    //         data.push(results)
    //         this
    //           .menu = [...this.menu, ...data];
    //         if (dataRes[2]) {
    //           const result3 = dataRes[2].map(e => {
    //             const item = new NbMenuItem();
    //             item.title = e.menuName;
    //             item.icon = 'pie-chart-outline';
    //             item.className = e.menuCode;
    //             // console.log('e.menuCode', e.menuCode);
    //             const children = e.items.map(sub => {
    //               const si = new NbMenuItem();
    //               si.title = sub.menuItemName;
    //               si.link = `${sub.screenIds ? '/pages/screen/' + sub.screenIds[0] : ''}`;
    //               si.icon = 'chevron-right-outline';
    //               return si;
    //             });
    //             const defaultChild = e.items.find(d => d.isDefault === 1);
    //             item.link = defaultChild ? `${defaultChild.screenIds ? '/pages/screen/' + defaultChild.screenIds[0] : ''}` : null;
    //             item.children = children;
    //             // console.log('item....', item);
    //             return item;
    //           });
    //           const roles = Object.keys(AuthoritiesConstant);
    //           // this
    //           //   .menu = this.originMenu.filter(e => {
    //           //   return (!e.data || !e.data.role || e.data.role.some(r => roles.indexOf(r) >= 0));
    //           // }).concat(result);
    //           this
    //             .menu = [...this.menu, ...result3];
    //         }
    //       });
    //       // this.menuConfigService.getMenuByProfileId(res.id).subscribe(menus => {
    //       //   this.menu = this.originMenu
    //       //
    //       // });
    //     }
    //   });
    //
    //   this.menuService.onItemClick().subscribe(res => {
    //     if (res.tag === 'main-sidebar-menu') {
    //       const item = res.item;
    //       if (item.link && item.children && item.children.length > 0) {
    //         this.router.navigate([item.link]);
    //         this.sidebarService.collapse('menu-sidebar');
    //       } else {
    //         if (item.children && item.children.length > 0) {
    //           this.router.navigate([item.children[0].link]);
    //         }
    //       }
    //       this.sidebarService.collapse('menu-sidebar');
    //     }
    //   });
    //   this._hotkeysService.add(new Hotkey('ctrl+f', (event: KeyboardEvent): boolean => {
    //     console.log('Typed hotkey');
    //     this.openDialogSearchFavorite();
    //     return false; // Prevent bubbling
    //   }));
    // }
    // openDialogSearchFavorite() {
    //   this.dialogService.open(SearchDashboardComponent, {
    //     autoFocus: false,
    //     context: {
    //       profileId: this.profileId
    //     },
    //   });
    // }
    // getAllResources() {
    //
    // }
