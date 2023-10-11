import { TestBed } from '@angular/core/testing';

import { IndividualAgentService } from './individual-agent.service';

describe('IndividualAgentService', () => {
  let service: IndividualAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndividualAgentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
