import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSUnderwritingEventsComponent } from './underwriting-events.component';

describe('CRMSUnderwritingEventsComponent', () => {
  let component: CRMSUnderwritingEventsComponent;
  let fixture: ComponentFixture<CRMSUnderwritingEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSUnderwritingEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSUnderwritingEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
