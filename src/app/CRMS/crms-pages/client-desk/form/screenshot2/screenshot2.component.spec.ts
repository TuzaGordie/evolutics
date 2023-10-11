import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSScreenshot2Component } from './screenshot2.component';

describe('CRMSScreenshot2Component', () => {
  let component: CRMSScreenshot2Component;
  let fixture: ComponentFixture<CRMSScreenshot2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSScreenshot2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSScreenshot2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
