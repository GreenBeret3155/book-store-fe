import {AuthoritiesConstant} from '../authorities.constant';
import {NbMenuItem} from '../menu-custom/menu.service';

export const MENU_ITEMS: NbMenuItem[] = [
  // {
  //   title: 'E-commerce',
  //   icon: 'shopping-cart-outline',
  //   link: '/pages/dashboard',
  //   home: true,
  // },
  {
    title: 'Trang chủ',
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'Cấu hình',
    icon: 'settings-2-outline',
    children: [
      {
        title: 'Profile',
        icon: 'chevron-right-outline',
        link: '/pages/dynamic-config/profile',
      },
      {
        title: 'Dashboard',
        icon: 'chevron-right-outline',
        link: '/pages/dynamic-config/dashboard',
      },
      {
        title: 'Biểu đồ',
        icon: 'chevron-right-outline',
        link: '/pages/dynamic-config/chart',
      },
      {
        title: 'Quản lý User',
        icon: 'chevron-right-outline',
        link: '/pages/user-management/user',
      },
      {
        title: 'Quản lý nhóm quyền',
        icon: 'chevron-right-outline',
        link: '/pages/dynamic-config/role-module',
      },
      {
        title: 'Quản lý nhóm biểu đồ',
        icon: 'chevron-right-outline',
        link: '/pages/dynamic-config/cat-groups-chart',
      },
      {
        title: 'Quản lý danh mục chỉ tiêu',
        icon: 'chevron-right-outline',
        link: '/pages/dynamic-config/cat-graph-kpi',
      },
      {
        title: 'Quản lý Menu',
        icon: 'chevron-right-outline',
        link: '/pages/dynamic-config/config-menu',
      },
      {
        title: 'Quản lý thẻ menu',
        icon: 'chevron-right-outline',
        link: '/pages/dynamic-config/config-menu-item',
      },
      {
        title: 'Giám sát tiến trình',
        icon: 'chevron-right-outline',
        link: '/pages/dynamic-config/monitor-query-kpi',
      },
      {
        title: 'Quản lý tổng hợp chỉ tiêu',
        icon: 'chevron-right-outline',
        link: '/pages/dynamic-config/config-query-kpi',
      },
      {
        title: 'Quản lý kế hoạch chỉ tiêu',
        icon: 'chevron-right-outline',
        link: '/pages/dynamic-config/bieumau-kehoachchitieu',
      },
      {
        title: 'Danh mục chung',
        icon: 'chevron-right-outline',
        link: '/pages/dynamic-config/cat-item',
      },
      {
        title: 'Quản lý thư mục báo cáo',
        icon: 'chevron-right-outline',
        link: '/pages/dynamic-config/report-management/report-folder',
      },
      {
        title: 'Quản lý báo cáo',
        icon: 'chevron-right-outline',
        link: '/pages/dynamic-config/report-management/report-file',
      },
      {
        title: 'Quản lý Action',
        icon: 'chevron-right-outline',
        link: '/pages/dynamic-config/actions',
      },
      {
        title: 'Quản lý Module',
        icon: 'chevron-right-outline',
        link: '/pages/dynamic-config/modules',
      },
    ],
  },
  {
    title: 'Nhập liệu',
    icon: 'chevron-right-outline',
    link: '/pages/nhap-lieu',
  },
  // {
  //   title: 'Báo cáo',
  //   icon: 'file-text-outline',
  //   link: 'report',
  // },

  {
    title: 'Tra cứu số liệu',
    icon: 'search-outline',
    link: '/pages/kpi-report',
  },
  {
    title: 'Truy cập nhanh',
    icon: 'star-outline',
    target: 'favorite-search',
  }
  // {
  //   title: 'Layout',
  //   icon: 'layout-outline',
  //   children: [
  //     {
  //       title: 'Stepper',
  //       link: '/pages/layout/stepper',
  //     },
  //     {
  //       title: 'List',
  //       link: '/pages/layout/list',
  //     },
  //     {
  //       title: 'Infinite List',
  //       link: '/pages/layout/infinite-list',
  //     },
  //     {
  //       title: 'Accordion',
  //       link: '/pages/layout/accordion',
  //     },
  //     {
  //       title: 'Tabs',
  //       pathMatch: 'prefix',
  //       link: '/pages/layout/tabs',
  //     },
  //   ],
  // },
  // {
  //   title: 'Forms',
  //   icon: 'edit-2-outline',
  //   children: [
  //     {
  //       title: 'Form Inputs',
  //       link: '/pages/forms/inputs',
  //     },
  //     {
  //       title: 'Form Layouts',
  //       link: '/pages/forms/layouts',
  //     },
  //     {
  //       title: 'Buttons',
  //       link: '/pages/forms/buttons',
  //     },
  //     {
  //       title: 'Datepicker',
  //       link: '/pages/forms/datepicker',
  //     },
  //   ],
  // },
  // {
  //   title: 'UI Features',
  //   icon: 'keypad-outline',
  //   link: '/pages/ui-features',
  //   children: [
  //     {
  //       title: 'Grid',
  //       link: '/pages/ui-features/grid',
  //     },
  //     {
  //       title: 'Icons',
  //       link: '/pages/ui-features/icons',
  //     },
  //     {
  //       title: 'Typography',
  //       link: '/pages/ui-features/typography',
  //     },
  //     {
  //       title: 'Animated Searches',
  //       link: '/pages/ui-features/search-fields',
  //     },
  //   ],
  // },
  // {
  //   title: 'Modal & Overlays',
  //   icon: 'browser-outline',
  //   children: [
  //     {
  //       title: 'Dialog',
  //       link: '/pages/modal-overlays/dialog',
  //     },
  //     {
  //       title: 'Window',
  //       link: '/pages/modal-overlays/window',
  //     },
  //     {
  //       title: 'Popover',
  //       link: '/pages/modal-overlays/popover',
  //     },
  //     {
  //       title: 'Toastr',
  //       link: '/pages/modal-overlays/toastr',
  //     },
  //     {
  //       title: 'Tooltip',
  //       link: '/pages/modal-overlays/tooltip',
  //     },
  //   ],
  // },
  // {
  //   title: 'Extra Components',
  //   icon: 'message-circle-outline',
  //   children: [
  //     {
  //       title: 'Calendar',
  //       link: '/pages/extra-components/calendar',
  //     },
  //     {
  //       title: 'Progress Bar',
  //       link: '/pages/extra-components/progress-bar',
  //     },
  //     {
  //       title: 'Spinner',
  //       link: '/pages/extra-components/spinner',
  //     },
  //     {
  //       title: 'Alert',
  //       link: '/pages/extra-components/alert',
  //     },
  //     {
  //       title: 'Calendar Kit',
  //       link: '/pages/extra-components/calendar-kit',
  //     },
  //     {
  //       title: 'Chat',
  //       link: '/pages/extra-components/chat',
  //     },
  //   ],
  // },
  // {
  //   title: 'Maps',
  //   icon: 'map-outline',
  //   children: [
  //     {
  //       title: 'Google Maps',
  //       link: '/pages/maps/gmaps',
  //     },
  //     {
  //       title: 'Leaflet Maps',
  //       link: '/pages/maps/leaflet',
  //     },
  //     {
  //       title: 'Bubble Maps',
  //       link: '/pages/maps/bubble',
  //     },
  //     {
  //       title: 'Search Maps',
  //       link: '/pages/maps/searchmap',
  //     },
  //   ],
  // },
  // {
  //   title: 'Charts',
  //   icon: 'pie-chart-outline',
  //   children: [
  //     {
  //       title: 'Echarts',
  //       link: '/pages/charts/echarts',
  //     },
  //     {
  //       title: 'Charts.js',
  //       link: '/pages/charts/chartjs',
  //     },
  //     {
  //       title: 'D3',
  //       link: '/pages/charts/d3',
  //     },
  //   ],
  // },
  // {
  //   title: 'Editors',
  //   icon: 'text-outline',
  //   children: [
  //     {
  //       title: 'TinyMCE',
  //       link: '/pages/editors/tinymce',
  //     },
  //     {
  //       title: 'CKEditor',
  //       link: '/pages/editors/ckeditor',
  //     },
  //   ],
  // },
  // {
  //   title: 'Tables & Data',
  //   icon: 'grid-outline',
  //   children: [
  //     {
  //       title: 'Smart Table',
  //       link: '/pages/tables/smart-table',
  //     },
  //     {
  //       title: 'Tree Grid',
  //       link: '/pages/tables/tree-grid',
  //     },
  //   ],
  // },
  // {
  //   title: 'Miscellaneous',
  //   icon: 'shuffle-2-outline',
  //   children: [
  //     {
  //       title: '404',
  //       link: '/pages/miscellaneous/404',
  //     },
  //   ],
  // },
  // {
  //   title: 'Auth',
  //   icon: 'lock-outline',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
];
