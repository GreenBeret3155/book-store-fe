import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatDialogWrapperComponent } from './chat-dialog-wrapper.component';

describe('ChatDialogWrapperComponent', () => {
  let component: ChatDialogWrapperComponent;
  let fixture: ComponentFixture<ChatDialogWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatDialogWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatDialogWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
