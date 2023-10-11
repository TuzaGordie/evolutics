import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSNewCorporateAgentComponent } from './new-corporate-agent.component';

describe('CRMSNewCorporateAgentComponent', () => {
  let component: CRMSNewCorporateAgentComponent;
  let fixture: ComponentFixture<CRMSNewCorporateAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSNewCorporateAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSNewCorporateAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
