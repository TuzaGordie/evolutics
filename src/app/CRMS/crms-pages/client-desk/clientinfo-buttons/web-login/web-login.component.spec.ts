import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSWebLoginComponent } from './web-login.component';

describe('CRMSWebLoginComponent', () => {
  let component: CRMSWebLoginComponent;
  let fixture: ComponentFixture<CRMSWebLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSWebLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSWebLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
