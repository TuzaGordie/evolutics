import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindtaskWorkflowComponent } from './findtask-workflow.component';

describe('FindtaskWorkflowComponent', () => {
  let component: FindtaskWorkflowComponent;
  let fixture: ComponentFixture<FindtaskWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindtaskWorkflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindtaskWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
