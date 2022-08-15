import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickModDialogComponent } from './pick-mod-dialog.component';

describe('PickModDialogComponent', () => {
  let component: PickModDialogComponent;
  let fixture: ComponentFixture<PickModDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickModDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickModDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
