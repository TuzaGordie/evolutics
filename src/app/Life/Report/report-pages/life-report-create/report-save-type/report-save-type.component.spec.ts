import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSaveTypeComponent } from './report-save-type.component';

describe('ReportSaveTypeComponent', () => {
  let component: ReportSaveTypeComponent;
  let fixture: ComponentFixture<ReportSaveTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportSaveTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSaveTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
