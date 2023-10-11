import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSetupsAgentLoanTypeComponent } from './create-agent-loan-type.component';

describe('CreateSetupsAgentLoanTypeComponent', () => {
  let component: CreateSetupsAgentLoanTypeComponent;
  let fixture: ComponentFixture<CreateSetupsAgentLoanTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSetupsAgentLoanTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSetupsAgentLoanTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
