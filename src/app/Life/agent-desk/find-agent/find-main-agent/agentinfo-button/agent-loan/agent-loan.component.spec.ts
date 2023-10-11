import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentLoanComponent } from './agent-loan.component';

describe('AgentLoanComponent', () => {
  let component: AgentLoanComponent;
  let fixture: ComponentFixture<AgentLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentLoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
