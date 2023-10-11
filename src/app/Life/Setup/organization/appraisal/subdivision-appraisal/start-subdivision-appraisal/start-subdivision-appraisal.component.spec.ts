import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartSubDivisionAppraisalComponent } from './start-subdivision-appraisal.component';

describe('StartSubDivisionAppraisalComponent', () => {
  let component: StartSubDivisionAppraisalComponent;
  let fixture: ComponentFixture<StartSubDivisionAppraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartSubDivisionAppraisalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartSubDivisionAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
