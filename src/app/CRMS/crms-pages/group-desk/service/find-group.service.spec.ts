import { TestBed } from '@angular/core/testing';

import { FindGroupService } from './find-group.service';

describe('FindGroupService', () => {
  let service: FindGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
