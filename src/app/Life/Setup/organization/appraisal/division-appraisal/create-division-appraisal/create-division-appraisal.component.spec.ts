import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDivisionAppraisalComponent } from './create-division-appraisal.component';

describe('CreateDivisionAppraisalComponent', () => {
  let component: CreateDivisionAppraisalComponent;
  let fixture: ComponentFixture<CreateDivisionAppraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDivisionAppraisalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDivisionAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
