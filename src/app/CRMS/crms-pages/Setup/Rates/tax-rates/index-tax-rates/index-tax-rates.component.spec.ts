import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexTaxRatesComponent } from './index-tax-rates.component';

describe('IndexTaxRatesComponent', () => {
  let component: IndexTaxRatesComponent;
  let fixture: ComponentFixture<IndexTaxRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexTaxRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexTaxRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
