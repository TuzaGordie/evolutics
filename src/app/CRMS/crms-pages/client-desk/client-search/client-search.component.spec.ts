import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSClientSearchComponent } from './client-search.component';

describe('CRMSClientSearchComponent', () => {
  let component: CRMSClientSearchComponent;
  let fixture: ComponentFixture<CRMSClientSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSClientSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSClientSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
