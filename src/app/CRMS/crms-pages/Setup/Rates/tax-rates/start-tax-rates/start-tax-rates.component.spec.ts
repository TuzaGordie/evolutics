import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartTaxRatesComponent } from './start-tax-rates.component';

describe('StartTaxRatesComponent', () => {
  let component: StartTaxRatesComponent;
  let fixture: ComponentFixture<StartTaxRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartTaxRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartTaxRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
