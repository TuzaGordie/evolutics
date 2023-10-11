import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowScheduleComponent } from './workflow-schedule.component';

describe('WorkflowScheduleComponent', () => {
  let component: WorkflowScheduleComponent;
  let fixture: ComponentFixture<WorkflowScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
