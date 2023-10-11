import { TestBed } from '@angular/core/testing';

import { FindQuotationService } from './find-quotation.service';

describe('FindQuotationService', () => {
  let service: FindQuotationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindQuotationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
