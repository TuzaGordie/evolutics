import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashRunbatchComponent } from './cash-runbatch.component';

describe('CashRunbatchComponent', () => {
  let component: CashRunbatchComponent;
  let fixture: ComponentFixture<CashRunbatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashRunbatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashRunbatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
