import { TestBed } from '@angular/core/testing';

import { CatItemServiceService } from './cat-item-service.service';

describe('CatItemServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatItemServiceService = TestBed.get(CatItemServiceService);
    expect(service).toBeTruthy();
  });
});
