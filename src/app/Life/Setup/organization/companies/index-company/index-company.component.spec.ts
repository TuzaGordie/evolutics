import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCompanyOrgComponent } from './index-company.component';

describe('IndexCompanyOrgComponent', () => {
  let component: IndexCompanyOrgComponent;
  let fixture: ComponentFixture<IndexCompanyOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCompanyOrgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCompanyOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
