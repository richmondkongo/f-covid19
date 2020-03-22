import { TestBed } from '@angular/core/testing';

import { TypeUserService } from './type-user.service';

describe('TypeUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeUserService = TestBed.get(TypeUserService);
    expect(service).toBeTruthy();
  });
});
