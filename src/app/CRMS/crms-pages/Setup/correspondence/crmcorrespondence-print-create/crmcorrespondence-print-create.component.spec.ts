import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMCorrespondencePrintCreateComponent } from './crmcorrespondence-print-create.component';

describe('CRMCorrespondencePrintCreateComponent', () => {
  let component: CRMCorrespondencePrintCreateComponent;
  let fixture: ComponentFixture<CRMCorrespondencePrintCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMCorrespondencePrintCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMCorrespondencePrintCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
