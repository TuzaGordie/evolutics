import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSPaymentInfoComponent } from './payment-info.component';

describe('CRMSPaymentInfoComponent', () => {
  let component: CRMSPaymentInfoComponent;
  let fixture: ComponentFixture<CRMSPaymentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSPaymentInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSPaymentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
