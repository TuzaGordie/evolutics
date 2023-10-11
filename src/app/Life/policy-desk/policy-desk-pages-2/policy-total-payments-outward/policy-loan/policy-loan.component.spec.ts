import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyLoanComponent } from './policy-loan.component';

describe('PolicyLoanComponent', () => {
  let component: PolicyLoanComponent;
  let fixture: ComponentFixture<PolicyLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyLoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
