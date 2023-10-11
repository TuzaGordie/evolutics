import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartAccountAccounts } from './start-accounts.component';

describe('StartAccountAccounts', () => {
  let component: StartAccountAccounts;
  let fixture: ComponentFixture<StartAccountAccounts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartAccountAccounts ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartAccountAccounts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
