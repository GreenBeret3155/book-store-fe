import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { delay, share, shareReplay, debounceTime } from 'rxjs/operators';

@Injectable()
export class LayoutService {

  protected onCollapse$ = new BehaviorSubject<boolean>(true);
  onCollapse = this.onCollapse$.asObservable();
  protected layoutSize$ = new Subject();
  protected layoutSizeChange$ = this.layoutSize$.pipe(
    shareReplay({ refCount: true }),
  );

  changeOnCollapse(value: boolean) {
    this.onCollapse$.next(value);
  }
  changeLayoutSize() {
    this.layoutSize$.next();
  }
  onChangeLayoutSize(): Observable<any> {
    return this.layoutSize$.pipe(
      share(),
      delay(1),
    );
  }

  onSafeChangeLayoutSize(): Observable<any> {
    return this.layoutSizeChange$.pipe(
      debounceTime(350),
    );
  }
}
