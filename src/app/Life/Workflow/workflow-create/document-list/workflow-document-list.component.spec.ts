import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowDocumentlistComponent } from './workflow-document-list.component';

describe('WorkflowDocumentlistComponent', () => {
  let component: WorkflowDocumentlistComponent;
  let fixture: ComponentFixture<WorkflowDocumentlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowDocumentlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowDocumentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
