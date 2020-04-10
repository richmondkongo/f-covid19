import { TestBed } from '@angular/core/testing';

import { CitoyenService } from './citoyen.service';

describe('CitoyenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CitoyenService = TestBed.get(CitoyenService);
    expect(service).toBeTruthy();
  });
});
