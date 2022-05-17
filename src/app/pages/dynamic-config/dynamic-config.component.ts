import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-dynamic-config',
  template: `
      <router-outlet></router-outlet>
  `,
})
export class DynamicConfigComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
