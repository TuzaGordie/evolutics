import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSWorkflowsComponent } from './workflows.component';

describe('CRMSWorkflowsComponent', () => {
  let component: CRMSWorkflowsComponent;
  let fixture: ComponentFixture<CRMSWorkflowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSWorkflowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSWorkflowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
