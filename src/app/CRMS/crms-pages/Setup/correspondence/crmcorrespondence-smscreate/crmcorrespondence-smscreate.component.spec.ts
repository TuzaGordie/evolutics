import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMCorrespondenceSMSCreateComponent } from './crmcorrespondence-smscreate.component';

describe('CRMCorrespondenceSMSCreateComponent', () => {
  let component: CRMCorrespondenceSMSCreateComponent;
  let fixture: ComponentFixture<CRMCorrespondenceSMSCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMCorrespondenceSMSCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMCorrespondenceSMSCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
