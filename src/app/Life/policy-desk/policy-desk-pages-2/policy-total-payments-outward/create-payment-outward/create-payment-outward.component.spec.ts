import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePaymentOutwardComponent } from './create-payment-outward.component';

describe('CreatePaymentOutwardComponent', () => {
  let component: CreatePaymentOutwardComponent;
  let fixture: ComponentFixture<CreatePaymentOutwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePaymentOutwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePaymentOutwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
