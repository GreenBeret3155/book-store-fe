import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { LoginDialogComponent } from '../../../auth-routing/login-dialog/login-dialog.component';

@Component({
  selector: 'ngx-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  constructor(
    private dialogService: NbDialogService
  ) { }

  ngOnInit() {
  }

  onOpenLoginDialog(){
    this.dialogService.open(LoginDialogComponent, {
      autoFocus: true,
    }).onClose.subscribe(res => {
      if(res){
      }
    });
  }
}
