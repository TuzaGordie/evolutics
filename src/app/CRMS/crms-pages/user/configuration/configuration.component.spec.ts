import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSConfigurationComponent } from './configuration.component';

describe('CRMSConfigurationComponent', () => {
  let component: CRMSConfigurationComponent;
  let fixture: ComponentFixture<CRMSConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
