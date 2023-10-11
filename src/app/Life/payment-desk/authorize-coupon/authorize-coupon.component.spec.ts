import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeCoupon } from './authorize-coupon.component';

describe('AuthorizeCoupon', () => {
  let component: AuthorizeCoupon;
  let fixture: ComponentFixture<AuthorizeCoupon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizeCoupon ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizeCoupon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
