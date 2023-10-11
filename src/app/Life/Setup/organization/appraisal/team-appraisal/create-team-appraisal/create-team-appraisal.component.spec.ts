import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeamAppraisalComponent } from './create-team-appraisal.component';

describe('CreateTeamAppraisalComponent', () => {
  let component: CreateTeamAppraisalComponent;
  let fixture: ComponentFixture<CreateTeamAppraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTeamAppraisalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTeamAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
