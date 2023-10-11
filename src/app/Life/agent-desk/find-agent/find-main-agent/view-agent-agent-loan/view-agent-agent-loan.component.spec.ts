import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAgentAgentLoanComponent } from './view-agent-agent-loan.component';

describe('ViewAgentAgentLoanComponent', () => {
  let component: ViewAgentAgentLoanComponent;
  let fixture: ComponentFixture<ViewAgentAgentLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAgentAgentLoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAgentAgentLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
