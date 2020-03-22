import { TestBed } from '@angular/core/testing';

import { MaladieService } from './maladie.service';

describe('MaladieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaladieService = TestBed.get(MaladieService);
    expect(service).toBeTruthy();
  });
});
