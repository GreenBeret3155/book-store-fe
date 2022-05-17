import { TestBed } from '@angular/core/testing';
import { ModuleActionService } from './module-action.service';

describe('ModuleActionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModuleActionService = TestBed.get(ModuleActionService);
    expect(service).toBeTruthy();
  });
});