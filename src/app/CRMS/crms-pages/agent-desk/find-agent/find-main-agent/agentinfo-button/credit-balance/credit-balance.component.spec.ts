import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSCreditBalanceComponent } from './credit-balance.component';

describe('CRMSCreditBalanceComponent', () => {
  let component: CRMSCreditBalanceComponent;
  let fixture: ComponentFixture<CRMSCreditBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSCreditBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSCreditBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
