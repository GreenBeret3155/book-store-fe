import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { OrderInfoService } from '../../../shared/services/main/order-info.service';

@Component({
  selector: 'ngx-description-dialog',
  templateUrl: './description-dialog.component.html',
  styleUrls: ['./description-dialog.component.scss']
})
export class DescriptionDialogComponent implements OnInit {

  infoForm: FormGroup = this.fb.group({
    description: [null, [Validators.required, Validators.maxLength(160)]],
  });

  constructor(protected ref: NbDialogRef<DescriptionDialogComponent>,
    private fb: FormBuilder,
    private orderInfoService : OrderInfoService,
  ) { }

  ngOnInit() {
  }

  save(){
    if(!this.infoForm.valid){
      return ;
    }
    this.ref.close(this.infoForm.get('description').value);
  }

  dismiss() {
    this.ref.close();
  }

}
