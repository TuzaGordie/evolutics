import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIndividualAppraisalComponent } from './create-individual-appraisal.component';

describe('CreateIndividualAppraisalComponent', () => {
  let component: CreateIndividualAppraisalComponent;
  let fixture: ComponentFixture<CreateIndividualAppraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateIndividualAppraisalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIndividualAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
