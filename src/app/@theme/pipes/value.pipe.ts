import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name : 'ngxValue' })
export class ValuePipe implements PipeTransform {
  transform(value: any, dateFormat?: string, numberFormat?: string): any {
    if (typeof value === 'number') {
      return new Intl.NumberFormat('vi-VN').format(Math.round((value + Number.EPSILON) * 100) / 100);
    } else {
      return value;
    }
  }
}
