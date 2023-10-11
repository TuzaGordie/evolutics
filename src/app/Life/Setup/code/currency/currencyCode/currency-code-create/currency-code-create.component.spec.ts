import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyCodeCreateComponent } from './currency-code-create.component';

describe('CurrencyCodeCreateComponent', () => {
  let component: CurrencyCodeCreateComponent;
  let fixture: ComponentFixture<CurrencyCodeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyCodeCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyCodeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
