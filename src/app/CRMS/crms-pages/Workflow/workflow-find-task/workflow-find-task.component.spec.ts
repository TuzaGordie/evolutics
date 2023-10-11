import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowFindtaskComponent } from './workflow-find-task.component';

describe('WorkflowFindtaskComponent', () => {
  let component: WorkflowFindtaskComponent;
  let fixture: ComponentFixture<WorkflowFindtaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowFindtaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowFindtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
