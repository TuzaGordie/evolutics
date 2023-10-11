import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDiscountRatesComponent } from './show-discount-rates.component';

describe('ShowDiscountRatesComponent', () => {
  let component: ShowDiscountRatesComponent;
  let fixture: ComponentFixture<ShowDiscountRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDiscountRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDiscountRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
