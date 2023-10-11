import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSPaymentdetailComponent } from './paymentdetail.component';

describe('CRMSPaymentdetailComponent', () => {
  let component: CRMSPaymentdetailComponent;
  let fixture: ComponentFixture<CRMSPaymentdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSPaymentdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSPaymentdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
