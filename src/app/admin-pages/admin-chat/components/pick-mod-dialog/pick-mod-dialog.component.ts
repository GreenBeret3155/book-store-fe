import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { User } from '../../../../@core/user/user.model';
import { UserService } from '../../../../@core/user/user.service';

@Component({
  selector: 'ngx-pick-mod-dialog',
  templateUrl: './pick-mod-dialog.component.html',
  styleUrls: ['./pick-mod-dialog.component.scss']
})
export class PickModDialogComponent implements OnInit {

  modUsers: Array<User> = [];
  readonly columns = [
    {name: 'Tài khoản', prop: 'login', flexGrow: 1},
    {name: 'Tên nhân viên', prop: 'lastName', flexGrow: 1},
    {name: 'Chọn nhân viên hỗ trợ', prop: 'state', flexGrow: 1}
  ];
  constructor(protected ref: NbDialogRef<PickModDialogComponent>,
    public userService: UserService,
  ) { }

  ngOnInit() {
    this.initMod();
  }

  initMod(){
    this.userService.query({
      page: 0,
      size: 100
    }, {
      authorities: "ROLE_MOD"
    }).subscribe(res => {
      this.modUsers = res.body;
    })
  }

  onSelectInfo(item: User){
    this.ref.close(item);
  }

  /*###########################################################################################*/
  dismiss() {
    this.ref.close();
  }

}
