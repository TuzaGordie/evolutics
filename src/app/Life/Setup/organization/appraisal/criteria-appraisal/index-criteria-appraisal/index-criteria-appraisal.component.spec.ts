import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCriteriaAppraisalComponent } from './index-criteria-appraisal.component';

describe('IndexCriteriaAppraisalComponent', () => {
  let component: IndexCriteriaAppraisalComponent;
  let fixture: ComponentFixture<IndexCriteriaAppraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCriteriaAppraisalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCriteriaAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
