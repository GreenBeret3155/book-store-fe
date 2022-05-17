import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input , OnInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'nb-chat-message-text',
  templateUrl: './chat-message-text.component.html',
  styleUrls: ['./chat-message-text.component.scss']
})
export class ChatMessageTextComponent implements OnInit {
  @Input() sender: any;
  @Input() message: any;
  @Input() date: any;

  constructor(public cd: ChangeDetectorRef, public domSanitizer: DomSanitizer) {
    this.cd = cd;
    this.domSanitizer = domSanitizer;
  }
  /**
   * Message file path
   * @type {Date}
   */

  ngOnInit() {
  }

}
