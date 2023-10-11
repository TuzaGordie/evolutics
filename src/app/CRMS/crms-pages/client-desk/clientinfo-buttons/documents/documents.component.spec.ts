import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSDocumentsComponent } from './documents.component';

describe('CRMSDocumentsComponent', () => {
  let component: CRMSDocumentsComponent;
  let fixture: ComponentFixture<CRMSDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
