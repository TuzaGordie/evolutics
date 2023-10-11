import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewGroupQuotationComponent } from './create-new-group-quotation.component';

describe('CreateNewGroupQuotationComponent', () => {
  let component: CreateNewGroupQuotationComponent;
  let fixture: ComponentFixture<CreateNewGroupQuotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewGroupQuotationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewGroupQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
