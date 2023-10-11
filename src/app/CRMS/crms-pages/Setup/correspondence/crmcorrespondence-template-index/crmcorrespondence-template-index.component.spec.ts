import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMCorrespondenceTemplateIndexComponent } from './crmcorrespondence-template-index.component';

describe('CRMCorrespondenceTemplateIndexComponent', () => {
  let component: CRMCorrespondenceTemplateIndexComponent;
  let fixture: ComponentFixture<CRMCorrespondenceTemplateIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMCorrespondenceTemplateIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMCorrespondenceTemplateIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
