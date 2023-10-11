import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSAgentWebLoginComponent } from './agent-web-login.component';

describe('CRMSAgentWebLoginComponent', () => {
  let component: CRMSAgentWebLoginComponent;
  let fixture: ComponentFixture<CRMSAgentWebLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSAgentWebLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSAgentWebLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
