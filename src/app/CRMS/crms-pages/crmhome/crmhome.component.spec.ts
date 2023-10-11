import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMHomeComponent } from './crmhome.component';

describe('CRMHomeComponent', () => {
  let component: CRMHomeComponent;
  let fixture: ComponentFixture<CRMHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
