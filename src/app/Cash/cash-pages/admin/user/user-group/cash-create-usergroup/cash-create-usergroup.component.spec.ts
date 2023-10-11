import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashCreateUsergroupComponent } from './cash-create-usergroup.component';

describe('CashCreateUsergroupComponent', () => {
  let component: CashCreateUsergroupComponent;
  let fixture: ComponentFixture<CashCreateUsergroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashCreateUsergroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashCreateUsergroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
