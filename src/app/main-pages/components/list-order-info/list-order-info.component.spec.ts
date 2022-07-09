import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrderInfoComponent } from './list-order-info.component';

describe('ListOrderInfoComponent', () => {
  let component: ListOrderInfoComponent;
  let fixture: ComponentFixture<ListOrderInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOrderInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
