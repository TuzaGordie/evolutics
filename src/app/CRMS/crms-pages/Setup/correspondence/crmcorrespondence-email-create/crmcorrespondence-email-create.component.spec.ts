import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMCorrespondenceEmailCreateComponent } from './crmcorrespondence-email-create.component';

describe('CRMCorrespondenceEmailCreateComponent', () => {
  let component: CRMCorrespondenceEmailCreateComponent;
  let fixture: ComponentFixture<CRMCorrespondenceEmailCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMCorrespondenceEmailCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMCorrespondenceEmailCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
