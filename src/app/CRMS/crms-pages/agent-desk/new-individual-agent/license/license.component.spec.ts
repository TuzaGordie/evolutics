import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSLicenseComponent } from './license.component';

describe('CRMSLicenseComponent', () => {
  let component: CRMSLicenseComponent;
  let fixture: ComponentFixture<CRMSLicenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSLicenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
