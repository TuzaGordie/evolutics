import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSFindAgentComponent } from './find-agent.component';

describe('CRMSFindAgentComponent', () => {
  let component: CRMSFindAgentComponent;
  let fixture: ComponentFixture<CRMSFindAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSFindAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSFindAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
