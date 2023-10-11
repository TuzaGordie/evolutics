import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSAgentSearchComponent } from './agent-search.component';

describe('CRMSAgentSearchComponent', () => {
  let component: CRMSAgentSearchComponent;
  let fixture: ComponentFixture<CRMSAgentSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSAgentSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSAgentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
