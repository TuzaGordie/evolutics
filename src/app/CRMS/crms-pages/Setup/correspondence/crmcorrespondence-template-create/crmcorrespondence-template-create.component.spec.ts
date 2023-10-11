import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMCorrespondenceTemplateCreateComponent } from './crmcorrespondence-template-create.component';

describe('CRMCorrespondenceTemplateCreateComponent', () => {
  let component: CRMCorrespondenceTemplateCreateComponent;
  let fixture: ComponentFixture<CRMCorrespondenceTemplateCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMCorrespondenceTemplateCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMCorrespondenceTemplateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
