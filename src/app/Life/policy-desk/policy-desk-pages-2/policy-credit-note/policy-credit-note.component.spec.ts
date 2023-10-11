import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyCreditNoteComponent } from './policy-credit-note.component';

describe('PolicyCreditNoteComponent', () => {
  let component: PolicyCreditNoteComponent;
  let fixture: ComponentFixture<PolicyCreditNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyCreditNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyCreditNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
