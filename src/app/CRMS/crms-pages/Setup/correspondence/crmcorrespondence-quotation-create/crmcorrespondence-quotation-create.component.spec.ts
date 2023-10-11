import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMCorrespondenceQuotationCreateComponent } from './crmcorrespondence-quotation-create.component';

describe('CRMCorrespondenceQuotationCreateComponent', () => {
  let component: CRMCorrespondenceQuotationCreateComponent;
  let fixture: ComponentFixture<CRMCorrespondenceQuotationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMCorrespondenceQuotationCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMCorrespondenceQuotationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
