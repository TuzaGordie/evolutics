import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashNewusermenuComponent } from './cash-newusermenu.component';

describe('CashNewusermenuComponent', () => {
  let component: CashNewusermenuComponent;
  let fixture: ComponentFixture<CashNewusermenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashNewusermenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashNewusermenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
