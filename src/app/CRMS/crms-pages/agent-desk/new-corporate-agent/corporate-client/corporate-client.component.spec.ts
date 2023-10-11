import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSCorporateClientComponent } from './corporate-client.component';

describe('CRMSCorporateClientComponent', () => {
  let component: CRMSCorporateClientComponent;
  let fixture: ComponentFixture<CRMSCorporateClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSCorporateClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSCorporateClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
