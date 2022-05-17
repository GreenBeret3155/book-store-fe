import { TestBed } from '@angular/core/testing';

import { ChartConvertDataService } from './chart-convert-data.service';

describe('ChartConvertDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChartConvertDataService = TestBed.get(ChartConvertDataService);
    expect(service).toBeTruthy();
  });
});
