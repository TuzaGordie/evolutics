import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindPolicyComponent } from './find-policy.component';

describe('FindPolicyComponent', () => {
  let component: FindPolicyComponent;
  let fixture: ComponentFixture<FindPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
