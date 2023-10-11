import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteReportIndexComponent } from './index.component';

describe('WriteReportIndexComponent', () => {
  let component: WriteReportIndexComponent;
  let fixture: ComponentFixture<WriteReportIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriteReportIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteReportIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
