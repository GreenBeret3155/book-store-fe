import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentResultPageComponent } from './payment-result-page.component';

describe('PaymentResultPageComponent', () => {
  let component: PaymentResultPageComponent;
  let fixture: ComponentFixture<PaymentResultPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentResultPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
