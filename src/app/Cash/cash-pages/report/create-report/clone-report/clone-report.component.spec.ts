import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloneReportComponent } from './clone-report.component';

describe('CloneReportComponent', () => {
  let component: CloneReportComponent;
  let fixture: ComponentFixture<CloneReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloneReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloneReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
