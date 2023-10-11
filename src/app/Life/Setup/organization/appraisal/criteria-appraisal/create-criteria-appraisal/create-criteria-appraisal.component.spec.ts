import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCriteriaAppraisalComponent } from './create-criteria-appraisal.component';

describe('CreateCriteriaAppraisalComponent', () => {
  let component: CreateCriteriaAppraisalComponent;
  let fixture: ComponentFixture<CreateCriteriaAppraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCriteriaAppraisalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCriteriaAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
