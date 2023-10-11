import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindQuotationComponent } from './find-quotation.component';

describe('FindQuotationComponent', () => {
  let component: FindQuotationComponent;
  let fixture: ComponentFixture<FindQuotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindQuotationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
