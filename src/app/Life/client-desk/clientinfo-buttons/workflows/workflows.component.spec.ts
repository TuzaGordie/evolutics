import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientWorkflowsComponent } from './workflows.component';

describe('WorkflowsComponent', () => {
  let component: ClientWorkflowsComponent;
  let fixture: ComponentFixture<ClientWorkflowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientWorkflowsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientWorkflowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
