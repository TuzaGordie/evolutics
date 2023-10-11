import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupDiscountRatesComponent } from './life-setup-discount-rates.component';

describe('SetupDiscountRatesComponent', () => {
  let component: SetupDiscountRatesComponent;
  let fixture: ComponentFixture<SetupDiscountRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupDiscountRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupDiscountRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
