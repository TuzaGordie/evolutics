import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompanyOrgComponent } from './create-company.component';

describe('CreateCompanyOrgComponent', () => {
  let component: CreateCompanyOrgComponent;
  let fixture: ComponentFixture<CreateCompanyOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCompanyOrgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCompanyOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
