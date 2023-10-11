import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizePaymentOutwardComponent } from './authorize-payment-outward.component';

describe('AuthorizePaymentOutwardComponent', () => {
  let component: AuthorizePaymentOutwardComponent;
  let fixture: ComponentFixture<AuthorizePaymentOutwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizePaymentOutwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizePaymentOutwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
