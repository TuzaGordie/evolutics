import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowSnoozeHistoryComponent } from './workflow-snooze-history.component';

describe('WorkflowSnoozeHistoryComponent', () => {
  let component: WorkflowSnoozeHistoryComponent;
  let fixture: ComponentFixture<WorkflowSnoozeHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowSnoozeHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowSnoozeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
