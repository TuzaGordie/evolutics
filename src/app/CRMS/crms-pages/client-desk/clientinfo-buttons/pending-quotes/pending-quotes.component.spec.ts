import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSPendingQuotesComponent } from './pending-quotes.component';

describe('CRMSPendingQuotesComponent', () => {
  let component: CRMSPendingQuotesComponent;
  let fixture: ComponentFixture<CRMSPendingQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSPendingQuotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSPendingQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
