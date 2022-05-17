import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'ngx-user-forward',
  templateUrl: './user-forward.component.html',
  styleUrls: ['./user-forward.component.scss']
})
export class UserForwardComponent implements OnInit {

  constructor(public ref: NbDialogRef<UserForwardComponent>) { }
  @Input() users: any
  usersSelected: any[] = [];
  ngOnInit() {
  }

}
