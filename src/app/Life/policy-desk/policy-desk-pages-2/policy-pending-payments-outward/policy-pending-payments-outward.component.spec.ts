import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyPendingPaymentsOutwardComponent } from './policy-pending-payments-outward.component';

describe('PolicyPendingPaymentsOutwardComponent', () => {
  let component: PolicyPendingPaymentsOutwardComponent;
  let fixture: ComponentFixture<PolicyPendingPaymentsOutwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyPendingPaymentsOutwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyPendingPaymentsOutwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
