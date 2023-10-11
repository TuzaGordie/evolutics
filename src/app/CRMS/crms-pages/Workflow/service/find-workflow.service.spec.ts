import { TestBed } from '@angular/core/testing';

import { FindWorkflowService } from './find-workflow.service';

describe('FindWorkflowService', () => {
  let service: FindWorkflowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindWorkflowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
