import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSRequisitionComponent } from './requisition.component';

describe('CRMSRequisitionComponent', () => {
  let component: CRMSRequisitionComponent;
  let fixture: ComponentFixture<CRMSRequisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSRequisitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
