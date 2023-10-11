import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyTotalPaymentsOutwardComponent } from './policy-total-payments-outward.component';

describe('PolicyTotalPaymentsOutwardComponent', () => {
  let component: PolicyTotalPaymentsOutwardComponent;
  let fixture: ComponentFixture<PolicyTotalPaymentsOutwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyTotalPaymentsOutwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyTotalPaymentsOutwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
