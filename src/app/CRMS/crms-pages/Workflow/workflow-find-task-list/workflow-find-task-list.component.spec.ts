import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowFindtaskListComponent } from './workflow-find-task-list.component';

describe('WorkflowFindtaskListComponent', () => {
  let component: WorkflowFindtaskListComponent;
  let fixture: ComponentFixture<WorkflowFindtaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowFindtaskListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowFindtaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
