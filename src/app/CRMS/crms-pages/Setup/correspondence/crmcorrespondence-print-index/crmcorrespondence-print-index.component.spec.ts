import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMCorrespondencePrintIndexComponent } from './crmcorrespondence-print-index.component';

describe('CRMCorrespondencePrintIndexComponent', () => {
  let component: CRMCorrespondencePrintIndexComponent;
  let fixture: ComponentFixture<CRMCorrespondencePrintIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMCorrespondencePrintIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMCorrespondencePrintIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
