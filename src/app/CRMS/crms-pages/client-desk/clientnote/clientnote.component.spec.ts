import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSClientnoteComponent } from './clientnote.component';

describe('CRMSClientnoteComponent', () => {
  let component: CRMSClientnoteComponent;
  let fixture: ComponentFixture<CRMSClientnoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSClientnoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSClientnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
