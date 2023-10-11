import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationSearchGBComponent } from './quotation-search-gb.component';

describe('QuotationSearchGBComponent', () => {
  let component: QuotationSearchGBComponent;
  let fixture: ComponentFixture<QuotationSearchGBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationSearchGBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationSearchGBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
