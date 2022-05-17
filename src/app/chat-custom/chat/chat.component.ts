import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';

@Component({
  selector: 'nb-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnChanges, AfterViewInit, AfterContentInit {
  @Input() title: any
  @Input() size: any
  @Input() status: any
  @Input() scrollBottom: boolean;
  @ViewChild('scrollable', {static: false}) scrollable: ElementRef<any>;
  @Input() messages: any;

  constructor() {
    this.scrollBottom = true;
  }
  /**
   * Scroll chat to the bottom of the list when a new message arrives
   */
  // get scrollBottom() {
  //   return this.scrollBottom;
  // }
  // set scrollBottom(value) {
  //   this.scrollBottom = !!value;
  // }
  ngOnChanges(changes) {
    if ('status' in changes) {
      this.updateFormStatus();
    }
  }
  ngAfterContentInit() {
    this.updateFormStatus();
  }
  ngAfterViewInit() {
    if (this.messages)
    this.messages.changes
      .subscribe((messages) => {
        this.messages = messages;
        this.updateView();
      });
    this.updateView();
  }
  updateView() {
    if (this.scrollBottom) {
      this.scrollListBottom();
    }
  }
  scrollListBottom() {
    this.scrollable.nativeElement.scrollTop = this.scrollable.nativeElement.scrollHeight;
  }
  updateFormStatus() {
    // if (this.chatForm) {
    //   this.chatForm.setStatus(this.status);
    // }
  }
  get tiny() {
    return this.size === 'tiny';
  }
  get small() {
    return this.size === 'small';
  }
  get medium() {
    return this.size === 'medium';
  }
  get large() {
    return this.size === 'large';
  }
  get giant() {
    return this.size === 'giant';
  }
  get primary() {
    return this.status === 'primary';
  }
  get success() {
    return this.status === 'success';
  }
  get info() {
    return this.status === 'info';
  }
  get warning() {
    return this.status === 'warning';
  }
  get danger() {
    return this.status === 'danger';
  }
  ngOnInit() {
    if (this.scrollable) {
      // this.scrollBottom = this.scrollable
    }
  }

}
