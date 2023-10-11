import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentWorkflowsComponent } from './agent-workflows.component';

describe('AgentWorkflowsComponent', () => {
  let component: AgentWorkflowsComponent;
  let fixture: ComponentFixture<AgentWorkflowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentWorkflowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentWorkflowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
