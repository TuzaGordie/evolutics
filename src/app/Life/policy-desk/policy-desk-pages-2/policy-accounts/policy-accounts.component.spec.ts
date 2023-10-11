import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyAccountsComponent } from './policy-accounts.component';

describe('PolicyAccountsComponent', () => {
  let component: PolicyAccountsComponent;
  let fixture: ComponentFixture<PolicyAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
