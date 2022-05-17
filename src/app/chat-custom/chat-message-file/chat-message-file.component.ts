import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {NbDialogService} from '@nebular/theme';
import {ImageViewComponent} from '../../shared/components/image-view/image-view.component';
import {UserService} from '../../@core/user/user.service';
import { NbIconLibraries } from '@nebular/theme';

@Component({
  selector: 'nb-chat-message-file',
  templateUrl: './chat-message-file.component.html',
  styleUrls: ['./chat-message-file.component.scss']
})
export class ChatMessageFileComponent implements OnInit {
  @Input() sender: any;
  public readyFiles: any;
  @Input() message: any;
  @Input() date: any;
  @Input() files: any[] = []
  @Input() url: any
  constructor(public cd: ChangeDetectorRef,
              public domSanitizer: DomSanitizer ,
              private router: Router,
              public userService: UserService,
              private iconLibraries: NbIconLibraries,
              public dialogService: NbDialogService) {
    this.cd = cd;
    this.domSanitizer = domSanitizer;
    this.iconLibraries.registerFontPack('font-awesome', { iconClassPrefix: 'fa' });
  }
  // set files(files) {
  //
  // }
  isImage(file) {
    return ['image/png', 'image/jpeg', 'image/gif'].includes(file.type);
  }
  ngOnInit() {
    if (this.files) {
      this.readyFiles = (this.files || []).map((file) => {
        const isImage = this.isImage(file);
        return Object.assign({}, file, { urlStyle: isImage && this.domSanitizer.bypassSecurityTrustStyle(`url(${file.url})`), isImage: isImage });
      });
      this.cd.detectChanges();
    }
  }

  download(url: string) {
    this.userService.downloadFile(url).subscribe(res => {
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

  openScreen(data: any) {
    window.open(data, '_blank');
  }

  openView(url: any) {
    console.log(url)
    const ref = this.dialogService.open(ImageViewComponent, {
      context: {
        url: url
      },
      autoFocus: false
    });
  }
}
