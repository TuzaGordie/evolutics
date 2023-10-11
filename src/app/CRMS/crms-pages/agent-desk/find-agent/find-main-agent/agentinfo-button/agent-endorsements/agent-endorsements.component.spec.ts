import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSAgentEndorsementsComponent } from './agent-endorsements.component';

describe('CRMSAgentEndorsementsComponent', () => {
  let component: CRMSAgentEndorsementsComponent;
  let fixture: ComponentFixture<CRMSAgentEndorsementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSAgentEndorsementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSAgentEndorsementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
