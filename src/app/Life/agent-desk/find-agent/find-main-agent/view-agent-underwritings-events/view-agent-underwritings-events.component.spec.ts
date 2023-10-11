import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAgentUnderwritingsEventsComponent } from './view-agent-underwritings-events.component';

describe('ViewAgentUnderwritingsEventsComponent', () => {
  let component: ViewAgentUnderwritingsEventsComponent;
  let fixture: ComponentFixture<ViewAgentUnderwritingsEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAgentUnderwritingsEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAgentUnderwritingsEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
