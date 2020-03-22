import { TestBed } from '@angular/core/testing';

import { TypeConsigneService } from './type-consigne.service';

describe('TypeConsigneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeConsigneService = TestBed.get(TypeConsigneService);
    expect(service).toBeTruthy();
  });
});
