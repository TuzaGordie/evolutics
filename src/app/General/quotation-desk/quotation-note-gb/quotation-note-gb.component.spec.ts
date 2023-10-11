import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationNoteGBComponent } from './quotation-note-gb.component';

describe('QuotationNoteGBComponent', () => {
  let component: QuotationNoteGBComponent;
  let fixture: ComponentFixture<QuotationNoteGBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationNoteGBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationNoteGBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
