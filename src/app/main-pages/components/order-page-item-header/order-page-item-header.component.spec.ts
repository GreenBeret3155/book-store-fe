import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPageItemHeaderComponent } from './order-page-item-header.component';

describe('OrderPageItemHeaderComponent', () => {
  let component: OrderPageItemHeaderComponent;
  let fixture: ComponentFixture<OrderPageItemHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPageItemHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPageItemHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
