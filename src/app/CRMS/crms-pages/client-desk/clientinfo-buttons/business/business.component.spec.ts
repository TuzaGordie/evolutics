import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSBusinessComponent } from './business.component';

describe('CRMSBusinessComponent', () => {
  let component: CRMSBusinessComponent;
  let fixture: ComponentFixture<CRMSBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSBusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
