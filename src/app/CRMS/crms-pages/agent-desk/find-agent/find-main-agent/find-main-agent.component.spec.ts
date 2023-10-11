import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSFindMainAgentComponent } from './find-main-agent.component';

describe('CRMSFindMainAgentComponent', () => {
  let component: CRMSFindMainAgentComponent;
  let fixture: ComponentFixture<CRMSFindMainAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSFindMainAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSFindMainAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
