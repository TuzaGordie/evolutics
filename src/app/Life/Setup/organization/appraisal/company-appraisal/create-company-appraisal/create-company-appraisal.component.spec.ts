import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompanyAppraisalComponent } from './create-company-appraisal.component';

describe('CreateCompanyAppraisalComponent', () => {
  let component: CreateCompanyAppraisalComponent;
  let fixture: ComponentFixture<CreateCompanyAppraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCompanyAppraisalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCompanyAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
