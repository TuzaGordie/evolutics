import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAgentWebLoginComponent } from './view-agent-web-login.component';

describe('ViewAgentWebLoginComponent', () => {
  let component: ViewAgentWebLoginComponent;
  let fixture: ComponentFixture<ViewAgentWebLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAgentWebLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAgentWebLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
