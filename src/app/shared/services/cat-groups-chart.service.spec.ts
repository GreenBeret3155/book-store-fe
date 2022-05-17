import { TestBed } from '@angular/core/testing';

import { CatGroupsChartService } from './cat-groups-chart.service';

describe('CatGroupsChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatGroupsChartService = TestBed.get(CatGroupsChartService);
    expect(service).toBeTruthy();
  });
});
