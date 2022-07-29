import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderInfoDialogComponent } from './add-order-info-dialog.component';

describe('AddOrderInfoDialogComponent', () => {
  let component: AddOrderInfoDialogComponent;
  let fixture: ComponentFixture<AddOrderInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrderInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrderInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
