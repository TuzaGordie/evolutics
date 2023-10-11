import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeQuotationSearchComponent } from './quotation-search.component';

describe('QuotationSearchComponent', () => {
  let component: LifeQuotationSearchComponent;
  let fixture: ComponentFixture<LifeQuotationSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LifeQuotationSearchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeQuotationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
