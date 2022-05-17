import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'ngx-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss']
})
export class ImageViewComponent implements OnInit {
  @Input() url: any;

  constructor(public ref: NbDialogRef<ImageViewComponent>) { }

  ngOnInit() {
  }

  downloadImage() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function () {
      const a = document.createElement('a'); // create html element anchor
      a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
      a.download = 'TEMP-1.jpg'; // Set the file name.
      a.style.display = 'none'; // set anchor as hidden
      document.body.appendChild(a);
      a.click();
      a.remove()
    };
    xhr.open('GET', this.url);
    xhr.send();
  }
}
