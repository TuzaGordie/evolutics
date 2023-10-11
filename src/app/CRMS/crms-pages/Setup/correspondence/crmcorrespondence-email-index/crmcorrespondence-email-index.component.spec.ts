import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMCorrespondenceEmailIndexComponent } from './crmcorrespondence-email-index.component';

describe('CRMCorrespondenceEmailIndexComponent', () => {
  let component: CRMCorrespondenceEmailIndexComponent;
  let fixture: ComponentFixture<CRMCorrespondenceEmailIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMCorrespondenceEmailIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMCorrespondenceEmailIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
