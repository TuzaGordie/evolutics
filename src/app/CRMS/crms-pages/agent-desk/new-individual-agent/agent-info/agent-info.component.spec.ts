import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSAgentInfoComponent } from './agent-info.component';

describe('CRMSAgentInfoComponent', () => {
  let component: CRMSAgentInfoComponent;
  let fixture: ComponentFixture<CRMSAgentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSAgentInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSAgentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
