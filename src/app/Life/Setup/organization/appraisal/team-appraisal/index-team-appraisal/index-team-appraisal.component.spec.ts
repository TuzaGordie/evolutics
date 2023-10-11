import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexTeamAppraisalComponent } from './index-team-appraisal.component';

describe('IndexTeamAppraisalComponent', () => {
  let component: IndexTeamAppraisalComponent;
  let fixture: ComponentFixture<IndexTeamAppraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexTeamAppraisalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexTeamAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
