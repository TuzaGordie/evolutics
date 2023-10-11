import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartIndividualAppraisalComponent } from './start-individual-appraisal.component';

describe('StartIndividualAppraisalComponent', () => {
  let component: StartIndividualAppraisalComponent;
  let fixture: ComponentFixture<StartIndividualAppraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartIndividualAppraisalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartIndividualAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
