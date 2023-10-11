import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyCodeStartComponent } from './currency-code-start.component';

describe('CurrencyCodeStartComponent', () => {
  let component: CurrencyCodeStartComponent;
  let fixture: ComponentFixture<CurrencyCodeStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyCodeStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyCodeStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
