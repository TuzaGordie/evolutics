import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashDatesComponent } from './cash-dates.component';

describe('CashDatesComponent', () => {
  let component: CashDatesComponent;
  let fixture: ComponentFixture<CashDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashDatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
