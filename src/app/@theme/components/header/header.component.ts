import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {
  NB_WINDOW,
  NbDialogService,
  NbIconLibraries,
  NbMediaBreakpointsService,
  NbSidebarService,
  NbThemeService
} from '@nebular/theme';
import {LayoutService} from '../../../@core/utils';
import {map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ProfileConfigService} from '../../../shared/services/profile-config.service';
import {HttpHeaders} from '@angular/common/http';
import {DashboardService} from '../../../shared/services/dashboard.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {AccountService} from '../../../@core/auth/account.service';
import {NbMenuItem, NbMenuService} from '../../../menu-custom/menu.service';
import {Constants} from '../../../shared/common.constant';
import {UserService} from '../../../@core/user/user.service';
import {FavoriteService} from '../../../shared/services/favorite.service';
import {CookieService} from 'ngx-cookie';
import {ChartConfigService} from '../../../shared/services/chart-config.service';
import {IDashboardConfig} from '../../../shared/model/dashboardConfig.model';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  CURENT_BREAD_CRUMB = 'CURENT_BREAD_CRUMB';
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  showMapButton: boolean = false;
  user: any;
  userInfo: any;
  openMenu = false
  currentUser: any;
  isCollapse: boolean = true;
  profiles = [];
  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    // {
    //   value: 'corporate',
    //   name: 'Corporate',
    // },
  ];

  currentTheme = 'dark';
  currentScreen;

  userMenu: NbMenuItem[] = [
    {title: 'Profile'},
    {title: 'Đổi mật khẩu', target: 'changePassword'},
    {title: 'Log out', target: 'logout'}
  ];
  profileForm = this.fb.group({
    profileId: [null]
  });
  profileId: any;
  overviewChart: IDashboardConfig;
  currentProfile: any;

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              // private userService: UserData,
              private cookieService: CookieService,
              private layoutService: LayoutService,
              private activatedRoute: ActivatedRoute,
              protected dialogService: NbDialogService,
              private breakpointService: NbMediaBreakpointsService,
              private favoriteService: FavoriteService,
              private serviceProfile: ProfileConfigService,
              private dashboardService: DashboardService,
              private chartConfigService: ChartConfigService,
              private userService: UserService,
              public router: Router,
              private fb: FormBuilder,
              // private route: ActivatedRoute,
              private accountService: AccountService,
              @Inject(NB_WINDOW) private window,
              iconsLibrary: NbIconLibraries
  ) {
    iconsLibrary.registerFontPack('fa', {packClass: 'fa', iconClassPrefix: 'fa'});
    iconsLibrary.registerFontPack('far', {packClass: 'far', iconClassPrefix: 'fa'});
    iconsLibrary.registerFontPack('ion', {iconClassPrefix: 'ion'});
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    if (this.currentTheme !== 'dark') {
      this.changeTheme('dark');
    }
    this.menuService.onItemClick()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((event: any) => {
          if (event.item.target === 'logout') {
            this.router.navigate(['auth/logout']);
          }
          if (event.item.target === 'changePassword') {
            this.router.navigate(['auth/change-password']);
          }
        }
      );
    this.accountService.identity().subscribe(res => {
      this.user = res;
      this.getNotification(this.user);
    });

    const {xl} = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({name}) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

    this.profileForm.get('profileId').valueChanges.subscribe(res => {
      if (res) {
        this.changeProfile(res, true);
        this.dashboardService.currentProfile.next(this.profiles.find(e => e.id === res));
      }
    });

    if (this.router.url.indexOf('/pages/screen/') !== -1) {
      this.dashboardService.currentScreen.subscribe(screen => {
        if (screen) {
          this.currentScreen = screen;
          const prf = this.profiles.find(e => e.id === screen.profileId);
          if (prf) {
            this.profileForm.get('profileId').patchValue(prf.id, {emitEvent: false});
            this.dashboardService.currentProfile.next(prf);
          }
        }
      })
    }
    this.dashboardService.currentProfile.subscribe(res => {
      this.currentProfile = res;
      // console.log('profileInfo', res);
      if (res && res.id) {
        if (res.id !== this.profileId) {
          this.profileId = res.id
          this.checkShowButtonMap(res.id);
          this.dashboardService.query({
            isDefault: 2,
            profileIds: res.id
          }).subscribe(data => {
            if (data) {
              this.overviewChart = data.body[0];
            }
          })
        }
      }
      // console.log('res change profile id', res);
    });
    this.serviceProfile.query({
      sort: ['orderIndex', 'profileName'],
    }).subscribe(
      res => this.onSuccess(res.body, res.headers));

    this.userService.userMessChange.subscribe(res => {
      this.getNotification(this.user)
    })

  }

  openOverView() {
    if (this.overviewChart && this.overviewChart.id) {
      this.router.navigate(['/pages/screen/', this.overviewChart.id]);
    }
  }

  checkShowButtonMap(profileId?: any) {
    // console.log('this.screenData.profileId', this.screenData);
    this.chartConfigService.getScreenMapId(profileId ? profileId : this.profileId).subscribe(res => {
      if (res && res.body) {
        this.showMapButton = true;
      } else {
        this.showMapButton = false;
      }
    })
  }

  openChartMap() {
    this.chartConfigService.getScreenMapId(this.profileId).subscribe(res => {
      // console.log('openChartMap->this.screenData.profileId', this.profileId);
      // console.log('openChartMap->res', res);
      if (res && res.body) {
        this.router.navigate(['/pages/screen', res.body]);
      }
      // this.showFilter = false;
      // this.dashboardService.openSearchBar.next();
    })
  }



  getNotification(res: any) {
    if (res && res.id) {
      this.userService.getNotifications().subscribe(data => {
        this.userInfo = data.body[0];
      })
    }
  }

  protected onSuccess(data: any | null, headers: HttpHeaders): void {
    this.profiles = data || [];
    let first = this.profiles.find(e => e.isDefault);
    if (this.router.url.indexOf('/pages/screen/') !== -1 && this.currentScreen) {
      first = this.profiles.find(e => e.id === this.currentScreen.profileId);
    }
    this.profileForm.get('profileId').patchValue(first.id, {emitEvent: false});
    this.dashboardService.currentProfile.next(first);
    if (this.router.url === '/pages/dashboard') {
      this.changeProfile(first.id, true);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
    this.dashboardService.currentTheme.next(themeName)
  }

  changeProfile(profile: any, routing?) {
    if (!profile) return;
    this.dashboardService.query({
      profileIds: profile,
      hasScreenOnly: true,
      size: Constants.MAX_SAFE_INTEGER,
      sort: ['isDefault,desc', 'orderIndex'],
    }).subscribe(res => this.redirectToDefaultScreen(res.body, res.headers, routing));
  }

  protected redirectToDefaultScreen(data: any | [], headers: HttpHeaders, routing?) {
    if (!data || data.length < 1) {
      alert('Profile chưa được cấu hình màn hình');
      return;
    }
    let mainScreens = data.find(i => {
      return i.isDefault === 1;
    });
    mainScreens = mainScreens || data[0];

    this.dashboardService.currentScreen.next(mainScreens);
    if (mainScreens) {
      if (routing) {
        this.router.navigate(['/pages/screen', mainScreens.id]);
      }
    } else {
      alert('Profile chưa được cấu hình màn hình');
    }
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }


  toggleSearchScreen() {
    this.dashboardService.openSearchBar.next();
    console.log('toggleSearchScreen>>>>')
  }

  openSidebar() {
    this.sidebarService.expand('menu-sidebar');
  }

  closeSidebar() {
    let isOnDiv = false;
    const sidebar = document.getElementsByTagName('nb-sidebar')[0];
    if (sidebar) {
      sidebar.addEventListener('mouseenter', () => {
        isOnDiv = true;
      });
    }
    setTimeout(() => {
      if (!isOnDiv) {
        this.sidebarService.collapse('menu-sidebar');
      }
    }, 500);
  }

  checkTitle(value: any) {
    return this.profiles.find(e => e.id === value) ? this.profiles.find(e => e.id === value).profileName : ''
  }

  toggleReportMenu() {
    this.isCollapse = !this.isCollapse
    if (this.isCollapse) {
      this.sidebarService.collapse('menu-right');
    } else {
      this.sidebarService.expand('menu-right')
    }
  }
}
