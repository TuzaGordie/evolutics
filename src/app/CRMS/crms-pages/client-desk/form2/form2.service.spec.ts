import { TestBed } from '@angular/core/testing';

import { Form2Service } from './form2.service';

describe('Form2Service', () => {
  let service: Form2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Form2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
