import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupTaxRatesComponent } from './life-setup-tax-rates.component';

describe('SetupTaxRatesComponent', () => {
  let component: SetupTaxRatesComponent;
  let fixture: ComponentFixture<SetupTaxRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupTaxRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupTaxRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
