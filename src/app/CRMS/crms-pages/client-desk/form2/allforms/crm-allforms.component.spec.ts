import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSAllformsComponent } from './crm-allforms.component';

describe('CRMSAllformsComponent', () => {
  let component: CRMSAllformsComponent;
  let fixture: ComponentFixture<CRMSAllformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSAllformsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSAllformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
