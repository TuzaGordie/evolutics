import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReassignWorkflowComponent } from './reassign-workflow.component';

describe('ReassignWorkflowComponent', () => {
  let component: ReassignWorkflowComponent;
  let fixture: ComponentFixture<ReassignWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReassignWorkflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReassignWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
