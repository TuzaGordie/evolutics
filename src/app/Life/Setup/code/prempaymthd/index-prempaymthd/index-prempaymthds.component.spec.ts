import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCodePremiumPaymentMethodComponent } from './index-prempaymthds.component';

describe('IndexCodePremiumPaymentMethodComponent', () => {
  let component: IndexCodePremiumPaymentMethodComponent;
  let fixture: ComponentFixture<IndexCodePremiumPaymentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCodePremiumPaymentMethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCodePremiumPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
