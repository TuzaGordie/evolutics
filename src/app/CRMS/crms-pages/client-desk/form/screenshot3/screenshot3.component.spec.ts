import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSScreenshot3Component } from './screenshot3.component';

describe('CRMSScreenshot3Component', () => {
  let component: CRMSScreenshot3Component;
  let fixture: ComponentFixture<CRMSScreenshot3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSScreenshot3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSScreenshot3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
