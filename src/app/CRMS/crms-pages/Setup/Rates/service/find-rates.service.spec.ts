import { TestBed } from '@angular/core/testing';

import { FindRatesService } from './find-rates.service';

describe('FindRatesService', () => {
  let service: FindRatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindRatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
