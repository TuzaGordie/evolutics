import { TestBed } from '@angular/core/testing';

import { FindMainAgentService } from './find-main-agent.service';

describe('FindMainAgentService', () => {
  let service: FindMainAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindMainAgentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
