import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMCorrespondenceSMSIndexComponent } from './crmcorrespondence-smsindex.component';

describe('CRMCorrespondenceSMSIndexComponent', () => {
  let component: CRMCorrespondenceSMSIndexComponent;
  let fixture: ComponentFixture<CRMCorrespondenceSMSIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMCorrespondenceSMSIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMCorrespondenceSMSIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
