import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuotationGBComponent } from './view-quotation-gb.component';

describe('ViewQuotationGBComponent', () => {
  let component: ViewQuotationGBComponent;
  let fixture: ComponentFixture<ViewQuotationGBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewQuotationGBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQuotationGBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
