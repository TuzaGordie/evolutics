import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexBranchesOrgComponent } from './index-branches.component';

describe('IndexBranchesOrgComponent', () => {
  let component: IndexBranchesOrgComponent;
  let fixture: ComponentFixture<IndexBranchesOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexBranchesOrgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexBranchesOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
