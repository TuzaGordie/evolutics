import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashNewuserComponent } from './cash-newuser.component';

describe('CashNewuserComponent', () => {
  let component: CashNewuserComponent;
  let fixture: ComponentFixture<CashNewuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashNewuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashNewuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
