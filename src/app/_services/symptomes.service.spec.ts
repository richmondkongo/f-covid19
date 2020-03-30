import { TestBed } from '@angular/core/testing';

import { SymptomesService } from './symptomes.service';

describe('SymptomesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SymptomesService = TestBed.get(SymptomesService);
    expect(service).toBeTruthy();
  });
});
