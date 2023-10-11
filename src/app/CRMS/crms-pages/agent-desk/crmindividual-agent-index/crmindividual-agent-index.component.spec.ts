import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMIndividualAgentIndexComponent } from './crmindividual-agent-index.component';

describe('CRMIndividualAgentIndexComponent', () => {
  let component: CRMIndividualAgentIndexComponent;
  let fixture: ComponentFixture<CRMIndividualAgentIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMIndividualAgentIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMIndividualAgentIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
