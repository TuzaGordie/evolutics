import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorWorkflowComponent } from './error-workflow.component';

describe('ErrorWorkflowComponent', () => {
  let component: ErrorWorkflowComponent;
  let fixture: ComponentFixture<ErrorWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorWorkflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
