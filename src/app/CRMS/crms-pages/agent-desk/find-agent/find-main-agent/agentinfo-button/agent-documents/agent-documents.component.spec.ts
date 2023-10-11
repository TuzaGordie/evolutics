import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSAgentDocumentsComponent } from './agent-documents.component';

describe('CRMSAgentDocumentsComponent', () => {
  let component: CRMSAgentDocumentsComponent;
  let fixture: ComponentFixture<CRMSAgentDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSAgentDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSAgentDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
