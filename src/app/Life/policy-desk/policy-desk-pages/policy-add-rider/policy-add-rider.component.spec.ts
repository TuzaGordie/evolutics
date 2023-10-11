import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyAddRiderComponent } from './policy-add-rider.component';

describe('PolicyAddRiderComponent', () => {
  let component: PolicyAddRiderComponent;
  let fixture: ComponentFixture<PolicyAddRiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyAddRiderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyAddRiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
