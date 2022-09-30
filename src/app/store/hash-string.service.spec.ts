import { TestBed } from '@angular/core/testing';

import { HashStringService } from './hash-string.service';

describe('HashStringService', () => {
  let service: HashStringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HashStringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
