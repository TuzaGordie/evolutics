import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentEndorsementsComponent } from './agent-endorsements.component';

describe('AgentEndorsementsComponent', () => {
  let component: AgentEndorsementsComponent;
  let fixture: ComponentFixture<AgentEndorsementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentEndorsementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentEndorsementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
