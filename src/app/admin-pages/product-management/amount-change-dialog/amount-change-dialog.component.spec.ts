import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountChangeDialogComponent } from './amount-change-dialog.component';

describe('AmountChangeDialogComponent', () => {
  let component: AmountChangeDialogComponent;
  let fixture: ComponentFixture<AmountChangeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmountChangeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountChangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
