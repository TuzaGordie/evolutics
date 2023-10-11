import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCompanyOrgComponent } from './start-company.component';

describe('StartCompanyOrgComponent', () => {
  let component: StartCompanyOrgComponent;
  let fixture: ComponentFixture<StartCompanyOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartCompanyOrgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartCompanyOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
