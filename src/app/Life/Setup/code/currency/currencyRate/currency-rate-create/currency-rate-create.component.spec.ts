import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyRateCreateComponent } from './currency-rate-create.component';

describe('CurrencyRateCreateComponent', () => {
  let component: CurrencyRateCreateComponent;
  let fixture: ComponentFixture<CurrencyRateCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyRateCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyRateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
