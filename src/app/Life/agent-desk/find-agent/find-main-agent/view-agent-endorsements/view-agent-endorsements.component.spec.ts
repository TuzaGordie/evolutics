import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAgentEndorsementsComponent } from './view-agent-endorsements.component';

describe('ViewAgentEndorsementsComponent', () => {
  let component: ViewAgentEndorsementsComponent;
  let fixture: ComponentFixture<ViewAgentEndorsementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAgentEndorsementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAgentEndorsementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
