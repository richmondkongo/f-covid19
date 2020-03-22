import { TestBed } from '@angular/core/testing';

import { ConsigneService } from './consigne.service';

describe('ConsigneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsigneService = TestBed.get(ConsigneService);
    expect(service).toBeTruthy();
  });
});
