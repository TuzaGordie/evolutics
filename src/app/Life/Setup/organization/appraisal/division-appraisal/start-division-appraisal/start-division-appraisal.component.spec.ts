import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartDivisionAppraisalComponent } from './start-division-appraisal.component';

describe('StartDivisionAppraisalComponent', () => {
  let component: StartDivisionAppraisalComponent;
  let fixture: ComponentFixture<StartDivisionAppraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartDivisionAppraisalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartDivisionAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
