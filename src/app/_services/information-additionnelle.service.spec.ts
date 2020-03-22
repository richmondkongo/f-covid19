import { TestBed } from '@angular/core/testing';

import { InformationAdditionnelleService } from './information-additionnelle.service';

describe('InformationAdditionnelleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InformationAdditionnelleService = TestBed.get(InformationAdditionnelleService);
    expect(service).toBeTruthy();
  });
});
