import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSCommonComponent } from './common.component';

describe('CRMSCommonComponent', () => {
  let component: CRMSCommonComponent;
  let fixture: ComponentFixture<CRMSCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSCommonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
