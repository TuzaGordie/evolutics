import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentRegisterNewClaimComponent } from './document-register-new-claim.component';

describe('DocumentRegisterNewClaimComponent', () => {
  let component: DocumentRegisterNewClaimComponent;
  let fixture: ComponentFixture<DocumentRegisterNewClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentRegisterNewClaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentRegisterNewClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
