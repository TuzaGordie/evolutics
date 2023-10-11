import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPaymentOutwardsComponent } from './pending-payment-outwards.component';

describe('PendingPaymentOutwardsComponent', () => {
  let component: PendingPaymentOutwardsComponent;
  let fixture: ComponentFixture<PendingPaymentOutwardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingPaymentOutwardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingPaymentOutwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
