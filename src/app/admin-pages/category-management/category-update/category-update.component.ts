import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { AdminProductService } from '../../../shared/services/admin/admin-product.service';

@Component({
  selector: 'ngx-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.scss']
})
export class CategoryUpdateComponent implements OnInit {

  @Input() category;
  infoForm: FormGroup = this.fb.group({
    name: [null, [Validators.required]],
  });

  constructor(protected ref: NbDialogRef<CategoryUpdateComponent>,
    private fb: FormBuilder,
    private adminProductService: AdminProductService
  ) { }

  ngOnInit() {    
    if(this.category){
      this.infoForm.get('name').patchValue(this.category.name);
    }
  }

  save(){
    if(!this.infoForm.valid){
      return ;
    }
    let data = {
      id: this.category? this.category.id : null,
      name: this.infoForm.get('name').value
    }
    this.adminProductService.saveCategory(data).subscribe(res => {
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
