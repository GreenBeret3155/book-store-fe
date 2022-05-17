import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChartFavoriteComponent } from './view-chart-favorite.component';

describe('ViewChartFavoriteComponent', () => {
  let component: ViewChartFavoriteComponent;
  let fixture: ComponentFixture<ViewChartFavoriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewChartFavoriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewChartFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
