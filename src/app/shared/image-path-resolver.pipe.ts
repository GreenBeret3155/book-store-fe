import { Pipe, PipeTransform } from '@angular/core';
import { Constants } from './common.constant';
@Pipe({ name: 'imagePathResolver' })
export class ImagePathResolverPipe implements PipeTransform {

  transform(input: any): any {
    return input ? (input.includes('http') ? input : `${Constants.CDN_URL}${input}`) : 'assets/images/noimage.png';
  }
}
