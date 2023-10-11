import { TestBed } from '@angular/core/testing';

import { AccountExtrasService } from './account-extras.service';

describe('AccountExtrasService', () => {
  let service: AccountExtrasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountExtrasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
