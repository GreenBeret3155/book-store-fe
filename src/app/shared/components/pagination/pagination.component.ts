import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter, forwardRef,
  Input, OnChanges,
  OnInit, Optional, Output, Self, SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef, ViewRef
} from '@angular/core';
import * as moment from 'moment';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';

@Component({
  selector: 'ngx-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  @Output() goToPage: EventEmitter<any> = new EventEmitter();
  @Input() totalPages: number = 0;
  @Input() page: any = 1;
  @Input() option: any = {
    showFirstLast: true,
    showNextPrev: true
  }
  pageItems: any[] = [];

  constructor(
    protected cd: ChangeDetectorRef,
  ) {
  }

  onGoToPage(page) {    
    if (page < 1) page = 1;
    if (page > this.totalPages) page = this.totalPages;
    this.page = page;
    this.goToPage.emit(page);
  }

  ngOnChanges(changes: SimpleChanges): void {    
    if ((changes.totalPages && changes.totalPages.currentValue)
      || (changes.page && changes.page.currentValue)) {
      const page = (changes.page && this.page !== changes.page.currentValue ? changes.page.currentValue : this.page) || 1;
      const totalPages = (changes.totalPages && this.totalPages !== changes.totalPages.currentValue ? changes.totalPages.currentValue : this.totalPages) || 0;
      this.pageItems = [];
      if (page < 6 && totalPages < 6) {
        for (let i = 0; i < totalPages; i++) {
          this.pageItems.push({
            page: i + 1,
            current: i + 1 === page
          })
        }
      } else {
        const start = Math.max(Math.min(page - 3, totalPages - 5), 0);
        const end = Math.min(start + 5, totalPages);
        for (let i = start; i < end; i++) {
          this.pageItems.push({
            page: i + 1,
            current: i + 1 === page
          })
        }
      }
    }
  }
}
