import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexAccountAccounts } from './index-accounts.component';

describe('IndexAccountAccounts', () => {
  let component: IndexAccountAccounts;
  let fixture: ComponentFixture<IndexAccountAccounts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexAccountAccounts ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexAccountAccounts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
