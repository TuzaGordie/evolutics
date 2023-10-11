import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTaxRatesComponent } from './show-tax-rates.component';

describe('ShowTaxRatesComponent', () => {
  let component: ShowTaxRatesComponent;
  let fixture: ComponentFixture<ShowTaxRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTaxRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTaxRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
