import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { AdminProductService } from '../../../shared/services/admin/admin-product.service';

@Component({
  selector: 'ngx-author-update',
  templateUrl: './author-update.component.html',
  styleUrls: ['./author-update.component.scss']
})
export class AuthorUpdateComponent implements OnInit {

  @Input() author;
  infoForm: FormGroup = this.fb.group({
    name: [null, [Validators.required]],
  });

  constructor(protected ref: NbDialogRef<AuthorUpdateComponent>,
    private fb: FormBuilder,
    private adminProductService: AdminProductService
  ) { }

  ngOnInit() {    
    if(this.author){
      this.infoForm.get('name').patchValue(this.author.name);
    }
  }

  save(){
    if(!this.infoForm.valid){
      return ;
    }
    let data = {
      id: this.author? this.author.id : null,
      name: this.infoForm.get('name').value
    }
    this.adminProductService.saveAuthor(data).subscribe(res => {
      this.ref.close(1);
    })
    // goi api
    // this.ref.close({
    //   state: this.stateChoice,
    //   description: this.infoForm.get('description').value,
    //   content: this.infoForm.get('content').value
    // });
  }

  dismiss() {
    this.ref.close();
  }

}
