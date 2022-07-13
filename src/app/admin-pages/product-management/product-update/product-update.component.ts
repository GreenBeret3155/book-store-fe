import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { AdminProductService } from '../../../shared/services/admin/admin-product.service';

@Component({
  selector: 'ngx-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {

  fileSelected: File;
  imageUrl: string = "http://localhost:8080/api/get?f=fb3e6f33-a0f8-4eef-966b-82e3852dc14a.png";
  constructor(private adminProductService: AdminProductService,
    private toastrService: NbToastrService) { }

  ngOnInit() {
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
          this.imageUrl = "http://localhost:8080/api/get?f=" + res.body.message;
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


