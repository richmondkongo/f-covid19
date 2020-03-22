import { TestBed } from '@angular/core/testing';

import { ReponseAdditionnelleService } from './reponse-additionnelle.service';

describe('ReponseAdditionnelleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReponseAdditionnelleService = TestBed.get(ReponseAdditionnelleService);
    expect(service).toBeTruthy();
  });
});
