import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSAgentinfoButtonComponent } from './agentinfo-button.component';

describe('CRMSAgentinfoButtonComponent', () => {
  let component: CRMSAgentinfoButtonComponent;
  let fixture: ComponentFixture<CRMSAgentinfoButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSAgentinfoButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSAgentinfoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
