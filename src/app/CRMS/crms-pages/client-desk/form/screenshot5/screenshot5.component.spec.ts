import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSScreenshot5Component } from './screenshot5.component';

describe('CRMSScreenshot5Component', () => {
  let component: CRMSScreenshot5Component;
  let fixture: ComponentFixture<CRMSScreenshot5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSScreenshot5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSScreenshot5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
