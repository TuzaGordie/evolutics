import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSadminusergroupComponent } from './lifeadminusergroup.component';

describe('AdminusergroupComponent', () => {
  let component: CRMSadminusergroupComponent;
  let fixture: ComponentFixture<CRMSadminusergroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSadminusergroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSadminusergroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
