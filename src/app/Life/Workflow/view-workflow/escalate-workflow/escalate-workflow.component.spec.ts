import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalateWorkflowComponent } from './escalate-workflow.component';

describe('EscalateWorkflowComponent', () => {
  let component: EscalateWorkflowComponent;
  let fixture: ComponentFixture<EscalateWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscalateWorkflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EscalateWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
