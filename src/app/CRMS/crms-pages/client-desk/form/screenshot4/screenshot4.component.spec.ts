import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSScreenshot4Component } from './screenshot4.component';

describe('CRMSScreenshot4Component', () => {
  let component: CRMSScreenshot4Component;
  let fixture: ComponentFixture<CRMSScreenshot4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSScreenshot4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSScreenshot4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
