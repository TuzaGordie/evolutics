import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyRateStartComponent } from './currency-rate-start.component';

describe('CurrencyRateStartComponent', () => {
  let component: CurrencyRateStartComponent;
  let fixture: ComponentFixture<CurrencyRateStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyRateStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyRateStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
