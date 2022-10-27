import { TestBed } from '@angular/core/testing';

import { GetMastersService } from './get-masters.service';

describe('GetMastersService', () => {
  let service: GetMastersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetMastersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
