import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartDiscountRatesComponent } from './start-discount-rates.component';

describe('StartDiscountRatesComponent', () => {
  let component: StartDiscountRatesComponent;
  let fixture: ComponentFixture<StartDiscountRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartDiscountRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartDiscountRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
