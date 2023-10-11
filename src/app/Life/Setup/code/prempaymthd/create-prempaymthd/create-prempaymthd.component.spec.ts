import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCodePremiumPaymentMethodComponent } from './create-prempaymthd.component';

describe('CreateCodePremiumPaymentMethodComponent', () => {
  let component: CreateCodePremiumPaymentMethodComponent;
  let fixture: ComponentFixture<CreateCodePremiumPaymentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCodePremiumPaymentMethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCodePremiumPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
