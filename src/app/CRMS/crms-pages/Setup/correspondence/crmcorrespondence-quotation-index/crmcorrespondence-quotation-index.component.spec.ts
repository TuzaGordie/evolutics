import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMCorrespondenceQuotationIndexComponent } from './crmcorrespondence-quotation-index.component';

describe('CRMCorrespondenceQuotationIndexComponent', () => {
  let component: CRMCorrespondenceQuotationIndexComponent;
  let fixture: ComponentFixture<CRMCorrespondenceQuotationIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMCorrespondenceQuotationIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMCorrespondenceQuotationIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
