import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAgentWorkflowsComponent } from './view-agent-workflows.component';

describe('ViewAgentWorkflowsComponent', () => {
  let component: ViewAgentWorkflowsComponent;
  let fixture: ComponentFixture<ViewAgentWorkflowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAgentWorkflowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAgentWorkflowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
