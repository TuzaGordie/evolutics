import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartSetupsAgentTypeComponent } from './start-agent-type.component';

describe('StartSetupsAgentTypeComponent', () => {
  let component: StartSetupsAgentTypeComponent;
  let fixture: ComponentFixture<StartSetupsAgentTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartSetupsAgentTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartSetupsAgentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
