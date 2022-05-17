import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {NbDialogService} from '@nebular/theme';
import {ImageViewComponent} from '../../shared/components/image-view/image-view.component';

@Component({
  selector: 'nb-chat-message-image',
  templateUrl: './chat-message-image.component.html',
  styleUrls: ['./chat-message-image.component.scss']
})
export class ChatMessageImageComponent implements OnInit {
  @Input() sender: any;
  public readyFiles: any;
  @Input() message: any;
  @Input() date: any;
  @Input() files: any[] = []
  @Input() url: any
  constructor(public cd: ChangeDetectorRef,
              public domSanitizer: DomSanitizer ,
              private router: Router,
              public dialogService: NbDialogService) {
    this.cd = cd;
    this.domSanitizer = domSanitizer;
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
    console.log(url)
  }

  openScreen(data: any) {
    window.open(data, '_blank');
  }

  openView(url: any) {
    // console.log(url)
    const ref = this.dialogService.open(ImageViewComponent, {
      context: {
        url: url
      },
      autoFocus: false
    });
  }
}
