import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSCommissionComponent } from './commission.component';

describe('CRMSCommissionComponent', () => {
  let component: CRMSCommissionComponent;
  let fixture: ComponentFixture<CRMSCommissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSCommissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
