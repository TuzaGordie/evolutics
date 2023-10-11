import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDiscountRateComponent } from './create-discount-rates.component';

describe('CreateDiscountRateComponent', () => {
  let component: CreateDiscountRateComponent;
  let fixture: ComponentFixture<CreateDiscountRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDiscountRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDiscountRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
