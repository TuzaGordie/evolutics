import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubDivisionAppraisalComponent } from './create-subdivision-appraisal.component';

describe('CreateSubDivisionAppraisalComponent', () => {
  let component: CreateSubDivisionAppraisalComponent;
  let fixture: ComponentFixture<CreateSubDivisionAppraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSubDivisionAppraisalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubDivisionAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
