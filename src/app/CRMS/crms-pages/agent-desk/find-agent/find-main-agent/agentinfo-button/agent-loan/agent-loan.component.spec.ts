import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSAgentLoanComponent } from './agent-loan.component';

describe('CRMSAgentLoanComponent', () => {
  let component: CRMSAgentLoanComponent;
  let fixture: ComponentFixture<CRMSAgentLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSAgentLoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSAgentLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
