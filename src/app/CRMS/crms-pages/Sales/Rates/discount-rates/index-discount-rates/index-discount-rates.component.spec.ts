import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexDiscountRatesComponent } from './index-discount-rates.component';

describe('IndexDiscountRatesComponent', () => {
  let component: IndexDiscountRatesComponent;
  let fixture: ComponentFixture<IndexDiscountRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexDiscountRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexDiscountRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
