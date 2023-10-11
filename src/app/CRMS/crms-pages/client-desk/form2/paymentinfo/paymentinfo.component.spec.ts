import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSPaymentinfoComponent } from './paymentinfo.component';

describe('CRMSPaymentinfoComponent', () => {
  let component: CRMSPaymentinfoComponent;
  let fixture: ComponentFixture<CRMSPaymentinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSPaymentinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSPaymentinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
