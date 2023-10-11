import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashNewusergroupComponent } from './cash-newusergroup.component';

describe('CashNewusergroupComponent', () => {
  let component: CashNewusergroupComponent;
  let fixture: ComponentFixture<CashNewusergroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashNewusergroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashNewusergroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
