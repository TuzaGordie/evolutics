import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBranchesOrgComponent } from './create-branches.component';

describe('CreateBranchesOrgComponent', () => {
  let component: CreateBranchesOrgComponent;
  let fixture: ComponentFixture<CreateBranchesOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBranchesOrgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBranchesOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
