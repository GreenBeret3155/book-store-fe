import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { onlyCharacterValidator } from '../../../shared/directives/only-characters.directive';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

import { NbIconConfig, NbToastrService } from '@nebular/theme';
import { customerNumberValidator, numberValidator } from '../../../shared/directives/custome-number.directive';
import { AdminProductService } from '../../../shared/services/admin/admin-product.service';
import { IProductModel } from '../../../shared/model/product.model';
import { Constants } from '../../../shared/common.constant';

@Component({
  selector: 'ngx-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {

  fileSelected: File;
  // imageUrl: string = "http://localhost:8080/api/get?f=fb3e6f33-a0f8-4eef-966b-82e3852dc14a.png";
  imageUrl: string;
  imageName: string;
  productForm: FormGroup = this.fb.group({
    id: null,
    name: [null, [Validators.required, Validators.maxLength(160)]],
    shortDescription: [null, [Validators.required]],
    status: true,
    price: [null, [numberValidator(/^[0-9]\d*(\.\d{0,10})?$/)]],
    originalPrice: [null, [numberValidator(/^[0-9]\d*(\.\d{0,10})?$/)]],
    discount: [null, [numberValidator(/^[0-9]\d*(\.\d{0,10})?$/)]],
    discountRate: [null, [numberValidator(/^[0-9]\d*(\.\d{0,10})?$/)]],
    description: [null],
    thumbnailUrl: [null],
    authorId: [null, [numberValidator(/^[0-9]\d*(\.\d{0,10})?$/)]],
    categoryId: [null, [numberValidator(/^[0-9]\d*(\.\d{0,10})?$/)]]
  });
  authors: any;
  categories: any;

  isUpdate: boolean;
  isReadOnly = true;
  isSaving: boolean;

  constructor(private adminProductService: AdminProductService,
    private toastrService: NbToastrService,
    private fb: FormBuilder, 
    public activatedRoute: ActivatedRoute, 
    protected router: Router,) { }

  ngOnInit() {
    this.isUpdate = false;
    this.activatedRoute.data.subscribe(({ objData }) => {
      this.isUpdate = (objData && objData.id) ? true : false;
      this.updateForm(objData);
    });
    this.adminProductService.getAllAuthors().subscribe(res => {
      this.authors = res.body;
    });
    this.adminProductService.getAllCategories().subscribe(res => {
      this.categories = res.body;
    });
    this.productForm.get('price').valueChanges.subscribe(() => this.updateDiscount());
    this.productForm.get('originalPrice').valueChanges.subscribe(() => this.updateDiscount());
  }

  // initUnit() {
  //   this.catItemServiceService.getCatItemByCategoryCode('UNIT').subscribe(res => {
  //     this.listUnit = res.body;
  //   });
  // }

  // initFomulas() {
  //   this.catItemServiceService.getCatItemByCategoryCode('FORMULA').subscribe(res => {
  //     this.formulas = res.body;
  //   });
  // }

  // initPlanTypes() {
  //   this.catItemServiceService.getCatItemByCategoryCode('ALARM_PLAN_TYPE').subscribe(res => {
  //     this.planTypes = res.body;
  //   });
  // }

  updateDiscount() {
    const price = this.productForm.get('price').value;
    const originalPrice = this.productForm.get('originalPrice').value;
    this.productForm.get('discount').patchValue(originalPrice - price);
    this.productForm.get('discountRate').patchValue(((originalPrice - price)/originalPrice*100).toFixed(0));
    return;
  }

  private updateForm(productItem: IProductModel) {
    if (!productItem) return;
    this.productForm.patchValue({
      id: productItem.id,
      name: productItem.name,
      shortDescription: productItem.shortDescription,
      status: productItem.status,
      price: productItem.price,
      originalPrice: productItem.originalPrice,
      discount: productItem.discount,
      discountRate: productItem.discountRate,
      description: productItem.description,
      thumbnailUrl: productItem.thumbnailUrl,
      authorId: productItem.author.id,
      categoryId: productItem.category.id
    });
    this.imageUrl = productItem.thumbnailUrl.includes('http') ? productItem.thumbnailUrl : `${Constants.CDN_URL}${productItem.thumbnailUrl}`
  }

  save() {
    this.isSaving = true;
    const model : IProductModel = this.productForm.getRawValue();
    if (model.status) {
      model.status = 1;
    } else {
      model.status = 0;
    }
    model.thumbnailUrl = this.imageName;
    this.adminProductService.saveProduct(model).subscribe(
      () => this.onSaveSuccess(),
      (errors) => this.onSaveError(errors)
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    const iconConfig: NbIconConfig = { icon: 'checkmark-outline', pack: 'eva' };
    this.toastrService.primary('Lưu thành công!', 'Thông báo', iconConfig)
    this.router.navigate(['/admin-pages/product-management']);
  }

  cancel() {
    this.router.navigate(['/admin-pages/product-management']);
  }

  protected onSaveError(errors): void {
    const iconConfig: NbIconConfig = { icon: 'checkmark-outline', pack: 'eva' };
    this.toastrService.warning(errors.error.message, 'Lưu thất bại', iconConfig)
    this.isSaving = false;
  }

  fileChange($event) {
    this.fileSelected = null;
    let fileList: FileList = $event.target.files;
    if (fileList.length > 0) {
      this.fileSelected = fileList[0];
      this.uploadImage();
    }
  }

  uploadImage() {
    let formData = new FormData();
    formData.append("file", this.fileSelected, this.fileSelected.name);
    this.adminProductService.saveImage(formData).subscribe(
      (res) => {
        console.log(res);
        this.toastrService.success("Thêm file thành công", "Thông báo");
        this.fileSelected = null;
        if(res.body.status = 200){
          this.imageUrl = Constants.CDN_URL + res.body.message;
          this.imageName = res.body.message;
        }
      },
      (error) => {
        if (error.error.status == 400) {
          this.toastrService.danger(
            "Lỗi khi upload ảnh",
          );
        } else {
          this.toastrService.danger(
            error.error.title,
          );
        }
      }
    );
  }
}


