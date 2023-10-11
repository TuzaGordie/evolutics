import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSPersonalinfoComponent } from './personalinfo.component';

describe('CRMSPersonalinfoComponent', () => {
  let component: CRMSPersonalinfoComponent;
  let fixture: ComponentFixture<CRMSPersonalinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSPersonalinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSPersonalinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
