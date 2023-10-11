import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartBranchesOrgComponent } from './start-branches.component';

describe('StartBranchesOrgComponent', () => {
  let component: StartBranchesOrgComponent;
  let fixture: ComponentFixture<StartBranchesOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartBranchesOrgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartBranchesOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
