import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'ngx-vn-picker',
  templateUrl: './vn-picker.component.html',
  styleUrls: ['./vn-picker.component.scss']
})
export class VnPickerComponent implements OnInit {

  @Input() control;

  monthValue: any;
  months = [
    {value: 1, label: 'Tháng 1'},
    {value: 2, label: 'Tháng 2'},
    {value: 3, label: 'Tháng 3'},
    {value: 4, label: 'Tháng 4'},
    {value: 5, label: 'Tháng 5'},
    {value: 6, label: 'Tháng 6'},
    {value: 7, label: 'Tháng 7'},
    {value: 8, label: 'Tháng 8'},
    {value: 9, label: 'Tháng 9'},
    {value: 10, label: 'Tháng 10'},
    {value: 11, label: 'Tháng 11'},
    {value: 12, label: 'Tháng 12'}
  ];
  quarterValue: any;
  quarters = [
    {value: 1, label: 'Quý 1'},
    {value: 2, label: 'Quý 2'},
    {value: 3, label: 'Quý 3'},
    {value: 4, label: 'Quý 4'}];
  years: any = [];
  yearValue: any;
  @Input() type: any;
  @Input() isStart: any;
  formGroup = this.fb.group({
    month: [null, Validators.required],
    year: [null, Validators.required],
    quarter: [null, Validators.required]
  });

  constructor(private fb: FormBuilder) {
    for (let i = 1970; i < 3000; i++) {
      this.years.push({value: i, label: `Năm ${i}`});
    }
  }

  ngOnInit() {
    if (this.control.value && moment.isMoment(this.control.value)) {
      const value = this.control.value;
      this.formGroup.patchValue(
        {
          month: value.month() + 1,
          quarter: this.isStart ? value.quarter() : value.add(1, 'day').quarter(),
          year: value.year()
        }
      );
    }
    this.formGroup.valueChanges.subscribe(value => {
      const rs: any = {};
      rs.date = 1;
      if (this.type === '4') {
        if (!value.year) {
          this.control.patchValue(null);
          return;
        }
        rs.month = 0;
      } else if (this.type === '3') {
        if (!value.quarter || !value.year) {
          this.control.patchValue(null);
          return;
        }
        rs.month = (value.quarter - 1) * 3;
      } else if (this.type === '2') {
        if (!value.month || !value.year) {
          this.control.patchValue(null);
          return;
        }
        rs.month = value.month - 1;
      }
      rs.year = value.year;

      let time = moment().set({year: rs.year, month: rs.month, date: rs.date});
      if (!this.isStart) {
        time = time.subtract(1, 'day');
      }
      this.control.patchValue(time);
    });
  }
}
