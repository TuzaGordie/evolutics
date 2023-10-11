import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountLedgerComponent } from './create-account-ledger.component';

describe('CreateAccountLedgerComponent', () => {
  let component: CreateAccountLedgerComponent;
  let fixture: ComponentFixture<CreateAccountLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccountLedgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
