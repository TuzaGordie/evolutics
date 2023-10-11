import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteReportStartComponent } from './start.component';

describe('WriteReportStartComponent', () => {
  let component: WriteReportStartComponent;
  let fixture: ComponentFixture<WriteReportStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriteReportStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteReportStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
