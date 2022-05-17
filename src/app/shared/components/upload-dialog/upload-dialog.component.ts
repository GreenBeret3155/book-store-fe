import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit {
  message: any;
  @Input() file: any[];
  host: any;
  isImage = false;
  imageSrc: any;
  constructor(public ref: NbDialogRef<UploadDialogComponent>, private router: Router) {
    this.host = window.location.href;
    this.host = this.host.replace(this.router.url, '');
  }

  ngOnInit() {
    if (this.file && this.file[0]) {
      this.isImage = /^image\//.test(this.file[0].type);
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(this.file[0]);
    }
  }

  sendMess() {
    const data = {
      message: this.message,
      file: Object.assign([], this.file)
    }
    this.ref.close(data)
  }
}
