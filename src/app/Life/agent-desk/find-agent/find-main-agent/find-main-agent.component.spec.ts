import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindMainAgentComponent } from './find-main-agent.component';

describe('FindMainAgentComponent', () => {
  let component: FindMainAgentComponent;
  let fixture: ComponentFixture<FindMainAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindMainAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindMainAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
