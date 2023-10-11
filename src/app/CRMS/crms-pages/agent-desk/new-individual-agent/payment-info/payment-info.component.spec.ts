import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSPaymentInfo2Component } from './c-r-m-s-payment-info2.component';

describe('CRMSPaymentInfoComponent', () => {
  let component: CRMSPaymentInfo2Component;
  let fixture: ComponentFixture<CRMSPaymentInfo2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSPaymentInfo2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSPaymentInfo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
