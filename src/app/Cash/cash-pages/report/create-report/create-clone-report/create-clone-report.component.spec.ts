import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCloneReportComponent } from './create-clone-report.component';

describe('CreateCloneReportComponent', () => {
  let component: CreateCloneReportComponent;
  let fixture: ComponentFixture<CreateCloneReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCloneReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCloneReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
