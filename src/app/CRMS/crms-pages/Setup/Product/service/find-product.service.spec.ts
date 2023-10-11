import { TestBed } from '@angular/core/testing';

import { FindProductService } from './find-product.service';

describe('FindProductService', () => {
  let service: FindProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
