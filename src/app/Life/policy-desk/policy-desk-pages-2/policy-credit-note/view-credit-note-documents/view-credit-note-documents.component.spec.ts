import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCreditNoteDocumentsComponent } from './view-credit-note-documents.component';

describe('ViewCreditNoteDocumentsComponent', () => {
  let component: ViewCreditNoteDocumentsComponent;
  let fixture: ComponentFixture<ViewCreditNoteDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCreditNoteDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCreditNoteDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
