import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../@core/user/user.service';

@Component({
  selector: 'ngx-download-page',
  templateUrl: './download-page.component.html',
  styleUrls: ['./download-page.component.scss']
})
export class DownloadPageComponent implements OnInit {
  downloadLink: any
  constructor(public route: ActivatedRoute,
              public userService: UserService) {
    this.downloadLink = decodeURIComponent(this.route.snapshot.params['link'])
  }

  ngOnInit() {
    if (this.downloadLink) {
      const url = JSON.parse(localStorage.getItem(this.downloadLink))
      this.userService.downloadFile(url.url).subscribe(res => {
        if (res) {
          if (res) {
            const link = document.createElement('a');
            const data = 'data:application/octet-stream;base64,' + res.fileContent
            // const downloadFile = new Blob([data])
            link.href = data;
            link.download = res.fileName
            link.click();
            window.close()
          }
        }
      })
    }
  }
}
