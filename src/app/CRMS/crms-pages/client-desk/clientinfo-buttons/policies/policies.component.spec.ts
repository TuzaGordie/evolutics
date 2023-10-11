import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSPoliciesComponent } from './policies.component';

describe('CRMSPoliciesComponent', () => {
  let component: CRMSPoliciesComponent;
  let fixture: ComponentFixture<CRMSPoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSPoliciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
