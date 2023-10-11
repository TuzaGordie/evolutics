import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSFormheaderComponent } from './formheader.component';

describe('CRMSFormheaderComponent', () => {
  let component: CRMSFormheaderComponent;
  let fixture: ComponentFixture<CRMSFormheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSFormheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSFormheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
