import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSPendingPaymentsComponent } from './pending-payments.component';

describe('CRMSPendingPaymentsComponent', () => {
  let component: CRMSPendingPaymentsComponent;
  let fixture: ComponentFixture<CRMSPendingPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSPendingPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSPendingPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
