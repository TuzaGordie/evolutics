import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashCreateUsermenuComponent } from './cash-create-usermenu.component';

describe('CashCreateUsermenuComponent', () => {
  let component: CashCreateUsermenuComponent;
  let fixture: ComponentFixture<CashCreateUsermenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashCreateUsermenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashCreateUsermenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
