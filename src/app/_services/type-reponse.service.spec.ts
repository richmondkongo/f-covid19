import { TestBed } from '@angular/core/testing';

import { TypeReponseService } from './type-reponse.service';

describe('TypeReponseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeReponseService = TestBed.get(TypeReponseService);
    expect(service).toBeTruthy();
  });
});
