import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, HostListener, Input, Output, OnInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'nb-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit {
  @Input() status: string;
  @Input() inputFocus: boolean;
  @Input() inputHover: boolean;
  @Input() droppedFiles: any[];
  @Input() imgDropTypes: string[];
  @Input() message: string;
  @Input() buttonTitle: string;
  @Input() buttonIcon: string;
  @Input() showButton: boolean;
  @Input() dropFiles: boolean;
  @Output() send: EventEmitter<any>;
  @Input() fileOver: boolean;

  constructor(public domSanitizer: DomSanitizer) {
    this.domSanitizer = domSanitizer;
    this.status = '';
    this.inputFocus = false;
    this.inputHover = false;
    this.droppedFiles = [];
    this.imgDropTypes = ['image/png', 'image/jpeg', 'image/gif'];
    /**
     * Predefined message text
     * @type {string}
     */
    this.message = '';
    /**
     * Send button title
     * @type {string}
     */
    this.buttonTitle = '';
    /**
     * Send button icon, shown if `buttonTitle` is empty
     * @type {string}
     */
    this.buttonIcon = 'paper-plane-outline';
    /**
     * Show send button
     * @type {boolean}
     */
    this.showButton = true;
    /**
     * Show send button
     * @type {boolean}
     */
    this.dropFiles = false;
    /**
     *
     * @type {EventEmitter<{ message: string, files: File[] }>}
     */
    this.send = new EventEmitter();
    this.fileOver = false;
  }
  onDrop(event) {
    if (this.dropFiles) {
      event.preventDefault();
      event.stopPropagation();
      this.fileOver = false;
      if (event.dataTransfer && event.dataTransfer.files) {
        for (const file of event.dataTransfer.files) {
          const res = file;
          if (this.imgDropTypes.includes(file.type)) {
            const fr = new FileReader();
            fr.onload = (e: any) => {
              res.src = e.target.result;
              res.urlStyle = this.domSanitizer.bypassSecurityTrustStyle(`url(${res.src})`);
              // this.cd.detectChanges();
            };
            fr.readAsDataURL(file);
          }
          this.droppedFiles.push(res);
        }
      }
    }
  }
  removeFile(file) {
    const index = this.droppedFiles.indexOf(file);
    if (index >= 0) {
      this.droppedFiles.splice(index, 1);
    }
  }
  onDragOver() {
    if (this.dropFiles) {
      this.fileOver = true;
    }
  }
  onDragLeave() {
    if (this.dropFiles) {
      this.fileOver = false;
    }
  }
  sendMessage() {
    if (this.droppedFiles.length || String(this.message).trim().length) {
      this.send.emit({ message: this.message, files: this.droppedFiles });
      this.message = '';
      this.droppedFiles = [];
    }
  }
  setStatus(status) {
    if (this.status !== status) {
      this.status = status;
      // this.cd.detectChanges();
    }
  }
  getInputStatus() {
    if (this.fileOver) {
      return this.status || 'primary';
    }
    if (this.inputFocus || this.inputHover) {
      return this.status;
    }
    return '';
  }

  ngOnInit() {
  }

}
