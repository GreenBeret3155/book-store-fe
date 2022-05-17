import { TestBed } from '@angular/core/testing';

import { BieumauKehoachchitieuService } from './bieumau-kehoachchitieu.service';

describe('BieumauKehoachchitieuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BieumauKehoachchitieuService = TestBed.get(BieumauKehoachchitieuService);
    expect(service).toBeTruthy();
  });
});
