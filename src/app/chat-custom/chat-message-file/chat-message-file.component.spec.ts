import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageFileComponent } from './chat-message-file.component';

describe('ChatMessageFileComponent', () => {
  let component: ChatMessageFileComponent;
  let fixture: ComponentFixture<ChatMessageFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMessageFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
