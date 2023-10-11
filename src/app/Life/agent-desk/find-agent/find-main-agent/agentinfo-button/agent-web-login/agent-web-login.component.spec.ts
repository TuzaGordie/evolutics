import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentWebLoginComponent } from './agent-web-login.component';

describe('AgentWebLoginComponent', () => {
  let component: AgentWebLoginComponent;
  let fixture: ComponentFixture<AgentWebLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentWebLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentWebLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
