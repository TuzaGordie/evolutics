import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMViewClientComponent } from './view-crm-client.component';

describe('CRMViewClientComponent', () => {
  let component: CRMViewClientComponent;
  let fixture: ComponentFixture<CRMViewClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMViewClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMViewClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
