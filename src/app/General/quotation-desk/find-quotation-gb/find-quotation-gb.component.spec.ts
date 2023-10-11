import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindQuotationGBComponent } from './find-quotation-gb.component';

describe('FindQuotationGBComponent', () => {
  let component: FindQuotationGBComponent;
  let fixture: ComponentFixture<FindQuotationGBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindQuotationGBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindQuotationGBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
