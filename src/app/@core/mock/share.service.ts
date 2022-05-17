import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ShareService {
  messageSource = new BehaviorSubject<any>(undefined);
  currentMessage = this.messageSource.asObservable();
  constructor() {
  }

  changeMessage(message) {
    this.messageSource.next(message);
  }
}
