import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({ name: 'dateFormat' })
export class AbsolutePipe implements PipeTransform {

  transform(input: any): any {
    return moment(input, 'YYYY-MM-DD HH:mm ZZ').format('HH:mm DD/MM/YYYY');
  }
}
