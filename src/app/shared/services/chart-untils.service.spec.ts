import { TestBed } from '@angular/core/testing';

import { ChartUntilsService } from './chart-untils.service';

describe('ChartUntilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChartUntilsService = TestBed.get(ChartUntilsService);
    expect(service).toBeTruthy();
  });
});
