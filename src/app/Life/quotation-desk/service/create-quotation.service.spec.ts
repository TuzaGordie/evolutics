import { TestBed } from '@angular/core/testing';

import { CreateQuotationService } from './create-quotation.service';

describe('CreateQuotationService', () => {
  let service: CreateQuotationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateQuotationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
