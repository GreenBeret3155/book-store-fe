import { TestBed } from '@angular/core/testing';

import { CatGraphKpiService } from './cat-graph-kpi.service';

describe('CatGraphKpiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatGraphKpiService = TestBed.get(CatGraphKpiService);
    expect(service).toBeTruthy();
  });
});
