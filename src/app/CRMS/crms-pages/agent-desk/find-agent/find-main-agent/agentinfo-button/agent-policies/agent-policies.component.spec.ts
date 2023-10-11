import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSAgentPoliciesComponent } from './agent-policies.component';

describe('CRMSAgentPoliciesComponent', () => {
  let component: CRMSAgentPoliciesComponent;
  let fixture: ComponentFixture<CRMSAgentPoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSAgentPoliciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSAgentPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
