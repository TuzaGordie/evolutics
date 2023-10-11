import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkflowScheduleComponent } from './create-workflow-schedule.component';

describe('CreateWorkflowScheduleComponent', () => {
  let component: CreateWorkflowScheduleComponent;
  let fixture: ComponentFixture<CreateWorkflowScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWorkflowScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkflowScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
