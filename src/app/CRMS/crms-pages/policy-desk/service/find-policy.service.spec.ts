import { TestBed } from '@angular/core/testing';

import { FindPolicyService } from './find-policy.service';

describe('FindPolicyService', () => {
  let service: FindPolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindPolicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
