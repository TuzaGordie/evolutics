import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSEndorsementsComponent } from './endorsements.component';

describe('CRMSEndorsementsComponent', () => {
  let component: CRMSEndorsementsComponent;
  let fixture: ComponentFixture<CRMSEndorsementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSEndorsementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSEndorsementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
