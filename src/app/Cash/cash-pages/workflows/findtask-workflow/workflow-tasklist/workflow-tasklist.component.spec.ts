import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowTasklistComponent } from './workflow-tasklist.component';

describe('WorkflowTasklistComponent', () => {
  let component: WorkflowTasklistComponent;
  let fixture: ComponentFixture<WorkflowTasklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowTasklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowTasklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
