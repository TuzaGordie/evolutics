import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSViewAgentComponent } from './view-agent.component';

describe('CRMSViewAgentComponent', () => {
  let component: CRMSViewAgentComponent;
  let fixture: ComponentFixture<CRMSViewAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSViewAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSViewAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
