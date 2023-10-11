import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAgentDocumentsComponent } from './view-agent-documents.component';

describe('ViewAgentDocumentsComponent', () => {
  let component: ViewAgentDocumentsComponent;
  let fixture: ComponentFixture<ViewAgentDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAgentDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAgentDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
