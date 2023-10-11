import { TestBed } from '@angular/core/testing';

import { FindClientsService } from './find-clients.service';

describe('FindClientsService', () => {
  let service: FindClientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindClientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
