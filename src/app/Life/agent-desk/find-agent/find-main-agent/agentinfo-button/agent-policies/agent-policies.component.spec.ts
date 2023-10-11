import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentPoliciesComponent } from './agent-policies.component';

describe('AgentPoliciesComponent', () => {
  let component: AgentPoliciesComponent;
  let fixture: ComponentFixture<AgentPoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentPoliciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
