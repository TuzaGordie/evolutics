import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexDivisionAppraisalComponent } from './index-division-appraisal.component';

describe('IndexDivisionAppraisalComponent', () => {
  let component: IndexDivisionAppraisalComponent;
  let fixture: ComponentFixture<IndexDivisionAppraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexDivisionAppraisalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexDivisionAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
