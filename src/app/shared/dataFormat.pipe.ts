import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'abs' })
export class DateFormatPipe implements PipeTransform {

  transform(input: any): number {
    return Math.abs(input);
  }
}
