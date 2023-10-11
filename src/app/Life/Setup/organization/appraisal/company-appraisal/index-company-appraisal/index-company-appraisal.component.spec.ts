import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCompanyAppraisalComponent } from './index-company-appraisal.component';

describe('IndexCompanyAppraisalComponent', () => {
  let component: IndexCompanyAppraisalComponent;
  let fixture: ComponentFixture<IndexCompanyAppraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCompanyAppraisalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCompanyAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
