import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-menu-tabs',
  templateUrl: './menu-tabs.component.html',
  styleUrls: ['./menu-tabs.component.scss']
})
export class MenuTabsComponent implements OnInit {
  @Input() screenData: any;
  @Input() lstTabs: any;
  activeTab: any;


  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  changeScreen(screen: any) {
    if (screen.isDefault === 1) {
      console.log(screen);
    }
    if (screen.id) {
      this.router.navigate(['/pages/screen', screen.id]);
      this.activeTab = screen;
    }
  }
}
