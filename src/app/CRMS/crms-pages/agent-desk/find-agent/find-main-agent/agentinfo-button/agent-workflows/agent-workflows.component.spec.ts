import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSAgentWorkflowsComponent } from './agent-workflows.component';

describe('CRMSAgentWorkflowsComponent', () => {
  let component: CRMSAgentWorkflowsComponent;
  let fixture: ComponentFixture<CRMSAgentWorkflowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSAgentWorkflowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSAgentWorkflowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
