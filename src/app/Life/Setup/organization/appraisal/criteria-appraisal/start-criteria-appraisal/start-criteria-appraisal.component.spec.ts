import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCriteriaAppraisalComponent } from './start-criteria-appraisal.component';

describe('StartCriteriaAppraisalComponent', () => {
  let component: StartCriteriaAppraisalComponent;
  let fixture: ComponentFixture<StartCriteriaAppraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartCriteriaAppraisalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartCriteriaAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
