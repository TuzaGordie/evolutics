import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSIdentificationComponent } from './identification.component';

describe('CRMSIdentificationComponent', () => {
  let component: CRMSIdentificationComponent;
  let fixture: ComponentFixture<CRMSIdentificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSIdentificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
