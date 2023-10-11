import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSadminuserComponent } from './lifeadminuser.component';

describe('AdminuserComponent', () => {
  let component: CRMSadminuserComponent;
  let fixture: ComponentFixture<CRMSadminuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSadminuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSadminuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
