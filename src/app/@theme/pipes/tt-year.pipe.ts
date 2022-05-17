import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'ttYear'
})
export class TtYearPipe implements PipeTransform {

  transform(value: any, onlyYear?: any): any {
    let format = 'DD/MM/YYYY';
    if (onlyYear) {
      format = 'YYYY';
    }
    return moment(value).format(format);
  }

}
