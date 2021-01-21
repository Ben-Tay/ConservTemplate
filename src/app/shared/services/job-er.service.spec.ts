import { TestBed } from '@angular/core/testing';

import { JobERService } from './job-er.service';

describe('JobERService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobERService = TestBed.get(JobERService);
    expect(service).toBeTruthy();
  });
});
