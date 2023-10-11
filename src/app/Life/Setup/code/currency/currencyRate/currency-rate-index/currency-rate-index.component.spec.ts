import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyRateIndexComponent } from './currency-rate-index.component';

describe('CurrencyRateIndexComponent', () => {
  let component: CurrencyRateIndexComponent;
  let fixture: ComponentFixture<CurrencyRateIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyRateIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyRateIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
