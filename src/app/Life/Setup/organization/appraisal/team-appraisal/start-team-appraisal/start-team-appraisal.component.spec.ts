import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartTeamAppraisalComponent } from './start-team-appraisal.component';

describe('StartTeamAppraisalComponent', () => {
  let component: StartTeamAppraisalComponent;
  let fixture: ComponentFixture<StartTeamAppraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartTeamAppraisalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartTeamAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
