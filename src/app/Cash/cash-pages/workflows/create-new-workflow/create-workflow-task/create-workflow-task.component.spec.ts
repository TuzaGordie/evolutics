import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkflowTaskComponent } from './create-workflow-task.component';

describe('CreateWorkflowTaskComponent', () => {
  let component: CreateWorkflowTaskComponent;
  let fixture: ComponentFixture<CreateWorkflowTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWorkflowTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkflowTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
