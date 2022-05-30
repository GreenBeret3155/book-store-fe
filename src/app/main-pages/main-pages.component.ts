import { Component, OnInit, Optional } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { ChatDialogComponent } from './components/chat-dialog/chat-dialog.component';

@Component({
  selector: 'ngx-main-pages',
  templateUrl: './main-pages.component.html',
  styleUrls: ['./main-pages.component.scss']
})
export class MainPagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
