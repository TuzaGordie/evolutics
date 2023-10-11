import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSScreenshot1Component } from './screenshot1.component';

describe('CRMSScreenshot1Component', () => {
  let component: CRMSScreenshot1Component;
  let fixture: ComponentFixture<CRMSScreenshot1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSScreenshot1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSScreenshot1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
