import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMFindClientComponent } from './find-crm-client.component';

describe('CRMFindClientComponent', () => {
  let component: CRMFindClientComponent;
  let fixture: ComponentFixture<CRMFindClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMFindClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMFindClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
