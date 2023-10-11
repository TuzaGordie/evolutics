import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCompanyAppraisalComponent } from './start-company-appraisal.component';

describe('StartCompanyAppraisalComponent', () => {
  let component: StartCompanyAppraisalComponent;
  let fixture: ComponentFixture<StartCompanyAppraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartCompanyAppraisalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartCompanyAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
