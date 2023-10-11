import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualQuotationGBComponent } from './individual-quotation-gb.component';

describe('IndividualQuotationGBComponent', () => {
  let component: IndividualQuotationGBComponent;
  let fixture: ComponentFixture<IndividualQuotationGBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualQuotationGBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualQuotationGBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
