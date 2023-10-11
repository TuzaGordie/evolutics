import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSHomeComponent } from './life-home.component';

describe('CRMSHomeComponent', () => {
  let component: CRMSHomeComponent;
  let fixture: ComponentFixture<CRMSHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
