import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartSetupsAgentLoanTypeComponent } from './start-agent-loan-type.component';

describe('StartSetupsAgentLoanTypeComponent', () => {
  let component: StartSetupsAgentLoanTypeComponent;
  let fixture: ComponentFixture<StartSetupsAgentLoanTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartSetupsAgentLoanTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartSetupsAgentLoanTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
