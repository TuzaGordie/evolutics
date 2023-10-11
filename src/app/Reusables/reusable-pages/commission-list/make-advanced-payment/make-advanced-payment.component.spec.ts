import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeAdvancedPaymentComponent } from './make-advanced-payment.component';

describe('MakeAdvancedPaymentComponent', () => {
  let component: MakeAdvancedPaymentComponent;
  let fixture: ComponentFixture<MakeAdvancedPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeAdvancedPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeAdvancedPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
