import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {distinctUntilChanged, filter} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie';
import {DashboardService} from '../../../shared/services/dashboard.service';

export interface IBreadCrumb {
  label: string;
  url: string;
  customPath?: string;
}

@Component({
  selector: 'ngx-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent implements OnInit  {
  CURENT_BREAD_CRUMB = 'CURENT_BREAD_CRUMB';
  breadcrumbs: any;
  domainName: any;
  domainCode: any;
  currentTheme: any = 'dark';
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private cookieService: CookieService,
              private dashboardService: DashboardService,
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
    })
  }

  ngOnInit() {
    this.dashboardService.currentTheme.subscribe(e => {
      if (e && this.currentTheme !== e) {
        this.currentTheme = e
      }
    })
    this.router;
  }

  checkUrl(url: any) {
    if (url !== this.router.url) {
      return 'pointer-hover'
    }
  }

  /**
   * Recursively build breadcrumb according to activated route.
   * @param route
   * @param url
   * @param breadcrumbs
   */
  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadCrumb[] = []): IBreadCrumb[] {
    // If no routeConfig is avalailable we are on the root path
    const breadcrumb = route.routeConfig && route.routeConfig.data ? route.routeConfig.data.breadcrumb : '';
    // Case: Screen
    this.domainName = null;
    this.domainCode = null;
    // if (breadcrumb.customPath) {
    //   const bcrData: IBreadCrumb[] = [{
    //     label: 'Trang chủ',
    //     url: '',
    //   }, {
    //     label: breadcrumb.label,
    //     url: breadcrumb.customPath,
    //   }];
    //   return bcrData;
    // }
    if (breadcrumb.isScreen) {
      const screenData = route.snapshot.data.screen;
      if (screenData.menuItemData) {
        this.domainName = screenData.menuItemData.menuName;
        this.domainCode = screenData.menuItemData.domainCode;
      }
      if (screenData && screenData.menuItem) {
        const isDefaultScr = screenData.menuItemData.items.find(e => e.isDefault === 1);
        const breadcrumbDatas: IBreadCrumb[] = [{
          label: 'Trang chủ',
          url: '',
        }, {
          label: screenData.menuItemData.menuName,
          url: `/pages/screen/${isDefaultScr ? isDefaultScr.screenIds[0] : screenData.id}`,
        }, {
          label: screenData.menuItem.menuItemName,
          url: `/pages/screen/${screenData.id}`,
        }];
        this.cookieService.putObject(this.CURENT_BREAD_CRUMB, screenData.menuItem.menuItemName);
        return breadcrumbDatas;
      } else {
        if (!(screenData.isDefault === 1)) {
          const breadcrumbDatas: IBreadCrumb[] = [{
            label: 'Trang chủ',
            url: '',
          }, {
            label: screenData.screenName,
            url: `/pages/screen/${screenData.id}`,
          }];
          this.cookieService.putObject(this.CURENT_BREAD_CRUMB, screenData.screenName);
          return breadcrumbDatas;
        }
      }
    }

    // Default
    let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

    // If the route is dynamic route such as ':id', remove it
    const lastRoutePart = path.split('/').pop();
    const isDynamicRoute = lastRoutePart.startsWith(':');

    if (isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart.split(':')[1];
      path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
      if (breadcrumb.unitField) {
        breadcrumb.label = route.snapshot.data[breadcrumb.unitField][breadcrumb.fieldName];
      }
    }

// In the routeConfig the complete path is not available,
// so we rebuild it each time
    const nextUrl = path ? `${url}/${path}` : url;
    const breadcrumbData: IBreadCrumb = {
      label: breadcrumb.label,
      url: nextUrl,
      customPath: breadcrumb.customPath
    };

// Only adding route with non-empty label
    const newBreadcrumbs = breadcrumbData.label ? [...breadcrumbs, breadcrumbData] : [...breadcrumbs];
    if (route.firstChild) {
      if (breadcrumb.label) {
        this.cookieService.putObject(this.CURENT_BREAD_CRUMB, breadcrumb.label);
      }
      // If we are not on our current path yet,
      // there will be more children to look after, to build our breadcumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
}
