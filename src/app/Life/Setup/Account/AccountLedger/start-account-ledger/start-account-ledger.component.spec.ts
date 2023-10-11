import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartAccountLedgerComponent } from './start-account-ledger.component';

describe('StartAccountLedgerComponent', () => {
  let component: StartAccountLedgerComponent;
  let fixture: ComponentFixture<StartAccountLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartAccountLedgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartAccountLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
