import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashCreateuserComponent } from './cash-createuser.component';

describe('CashCreateuserComponent', () => {
  let component: CashCreateuserComponent;
  let fixture: ComponentFixture<CashCreateuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashCreateuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashCreateuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
