import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentinfoButtonComponent } from './agentinfo-button.component';

describe('AgentinfoButtonComponent', () => {
  let component: AgentinfoButtonComponent;
  let fixture: ComponentFixture<AgentinfoButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentinfoButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentinfoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
