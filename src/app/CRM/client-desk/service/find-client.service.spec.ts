import { TestBed } from '@angular/core/testing';

import { FindClientService } from './find-client.service';

describe('FindClientService', () => {
  let service: FindClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
