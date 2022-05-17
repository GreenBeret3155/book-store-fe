import {isDate, isNumber, isString} from 'util';

export function formatClassData(data: any) {
  if (data && isNumber(data) || data === 0) {
    return 'text-right';
  } else if (data && isDate(data)) {
    return 'text-center'
  } else if (data && isString(data)) {
    return 'text-left'
  }
}
