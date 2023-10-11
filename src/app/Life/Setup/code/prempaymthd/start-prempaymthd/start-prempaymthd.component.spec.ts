import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCodePremiumPaymentMethodComponent } from './start-prempaymthd.component';

describe('StartCodePremiumPaymentMethodComponent', () => {
  let component: StartCodePremiumPaymentMethodComponent;
  let fixture: ComponentFixture<StartCodePremiumPaymentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartCodePremiumPaymentMethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartCodePremiumPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
