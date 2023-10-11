import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyTotalPaymentsReceivedComponent } from './policy-total-payments-received.component';

describe('PolicyTotalPaymentsReceivedComponent', () => {
  let component: PolicyTotalPaymentsReceivedComponent;
  let fixture: ComponentFixture<PolicyTotalPaymentsReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyTotalPaymentsReceivedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyTotalPaymentsReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
