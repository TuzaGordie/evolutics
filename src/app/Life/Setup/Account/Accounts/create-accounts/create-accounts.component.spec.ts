import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountAccounts } from './create-accounts.component';

describe('CreateAccountAccounts', () => {
  let component: CreateAccountAccounts;
  let fixture: ComponentFixture<CreateAccountAccounts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccountAccounts ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountAccounts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
