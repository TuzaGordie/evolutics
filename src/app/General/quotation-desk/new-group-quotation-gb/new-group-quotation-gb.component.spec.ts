import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGroupQuotationGBComponent } from './new-group-quotation-gb.component';

describe('NewGroupQuotationGBComponent', () => {
  let component: NewGroupQuotationGBComponent;
  let fixture: ComponentFixture<NewGroupQuotationGBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewGroupQuotationGBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGroupQuotationGBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
