import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextStateDialogComponent } from './next-state-dialog.component';

describe('NextStateDialogComponent', () => {
  let component: NextStateDialogComponent;
  let fixture: ComponentFixture<NextStateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextStateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextStateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
