import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSEmployinfoComponent } from './employinfo.component';

describe('CRMSEmployinfoComponent', () => {
  let component: CRMSEmployinfoComponent;
  let fixture: ComponentFixture<CRMSEmployinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSEmployinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSEmployinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
