import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexSubDivisionAppraisalComponent } from './index-subdivision-appraisal.component';

describe('IndexSubDivisionAppraisalComponent', () => {
  let component: IndexSubDivisionAppraisalComponent;
  let fixture: ComponentFixture<IndexSubDivisionAppraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexSubDivisionAppraisalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexSubDivisionAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
