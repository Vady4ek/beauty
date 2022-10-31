import { TestBed } from '@angular/core/testing';

import { GetJobService } from './get-job.service';

describe('GetJobService', () => {
  let service: GetJobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetJobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
