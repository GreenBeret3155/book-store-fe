import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserForwardComponent } from './user-forward.component';

describe('UserForwardComponent', () => {
  let component: UserForwardComponent;
  let fixture: ComponentFixture<UserForwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserForwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserForwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
