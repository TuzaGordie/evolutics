import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyCodeIndexComponent } from './currency-code-index.component';

describe('CurrencyCodeIndexComponent', () => {
  let component: CurrencyCodeIndexComponent;
  let fixture: ComponentFixture<CurrencyCodeIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyCodeIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyCodeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
