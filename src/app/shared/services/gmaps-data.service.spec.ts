import { TestBed } from '@angular/core/testing';

import { GmapsDataService } from './gmaps-data.service';

describe('GmapsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GmapsDataService = TestBed.get(GmapsDataService);
    expect(service).toBeTruthy();
  });
});
