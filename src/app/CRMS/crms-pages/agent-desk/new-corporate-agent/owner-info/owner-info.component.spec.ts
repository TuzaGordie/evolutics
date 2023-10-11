import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSOwnerInfoComponent } from './c-r-m-s-owner-info.component';

describe('CRMSOwnerInfoComponent', () => {
  let component: CRMSOwnerInfoComponent;
  let fixture: ComponentFixture<CRMSOwnerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSOwnerInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSOwnerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
