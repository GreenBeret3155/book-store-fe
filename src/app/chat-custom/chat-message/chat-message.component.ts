import { ChangeDetectionStrategy, Component, HostBinding, Input , OnInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { animate, state, style, transition, trigger } from '@angular/animations';
// import {convertToBoolProperty} from '@nebular/theme/components/helpers';
@Component({
  selector: 'nb-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(80),
      ]),
      transition('* => void', [
        animate(80, style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ]
})
export class ChatMessageComponent implements OnInit {
  @Input() avatarStyle: any;
  @Input() sender: any;
  @Input() type: any;
  @Input() date: any;
  @Input() message: any;
  @Input() files: any;
  @Input() reply: any;
  @Input() avatar: any;
  @Input() url: any;
  @Input() showDate: any;
  @Input() showAvatar: boolean
  constructor(public domSanitizer: DomSanitizer) {
    this.domSanitizer = domSanitizer;
    this.reply = false;
  }
  // get flyInOut() {
  //   return true;
  // }
  // get notReply() {
  //   // return !this.reply;
  // }
  /**
   * Determines if a message is a reply
   */
  // get reply() {
  //   return this.reply;
  // }
  // set reply(value) {
  //   this.reply = !!value;
  // }
  /**
   * Message send avatar
   * @type {string}
   */
  // set avatar(value) {
  //   this.avatarStyle = value ? this.domSanitizer.bypassSecurityTrustStyle(`url(${value})`) : null;
  // }
  getInitials() {
    if (this.sender) {
      const names = this.sender.split(' ');
      return names.map(n => n.charAt(0)).splice(0, 2).join('').toUpperCase();
    }
    return '';
  }

  ngOnInit() {
    if (this.avatar) {
      this.avatarStyle = this.avatar ? this.domSanitizer.bypassSecurityTrustStyle(`url(${this.avatar})`) : null;
    }
  }

}
