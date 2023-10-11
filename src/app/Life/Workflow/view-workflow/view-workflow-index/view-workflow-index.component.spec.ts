import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWorkflowIndexComponent } from './view-workflow-index.component';

describe('ViewWorkflowIndexComponent', () => {
  let component: ViewWorkflowIndexComponent;
  let fixture: ComponentFixture<ViewWorkflowIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewWorkflowIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWorkflowIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
