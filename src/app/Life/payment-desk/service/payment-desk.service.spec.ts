import { TestBed } from '@angular/core/testing';

import { PaymentDeskService } from './payment-desk.service';

describe('PaymentDeskService', () => {
  let service: PaymentDeskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentDeskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
