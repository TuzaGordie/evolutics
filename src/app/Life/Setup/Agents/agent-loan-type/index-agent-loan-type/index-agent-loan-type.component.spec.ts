import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexSetupsAgentLoanTypeComponent } from './index-agent-loan-type.component';

describe('IndexSetupsAgentLoanTypeComponent', () => {
  let component: IndexSetupsAgentLoanTypeComponent;
  let fixture: ComponentFixture<IndexSetupsAgentLoanTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexSetupsAgentLoanTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexSetupsAgentLoanTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
