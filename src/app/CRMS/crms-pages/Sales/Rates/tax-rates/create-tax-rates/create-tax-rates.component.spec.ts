import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaxRateComponent } from './create-tax-rates.component';

describe('CreateTaxRateComponent', () => {
  let component: CreateTaxRateComponent;
  let fixture: ComponentFixture<CreateTaxRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTaxRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaxRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
