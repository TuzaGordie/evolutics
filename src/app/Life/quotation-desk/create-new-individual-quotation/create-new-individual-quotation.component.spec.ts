import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewIndividualQuotationComponent } from './create-new-individual-quotation.component';

describe('CreateNewIndividualQuotationComponent', () => {
  let component: CreateNewIndividualQuotationComponent;
  let fixture: ComponentFixture<CreateNewIndividualQuotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewIndividualQuotationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewIndividualQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
