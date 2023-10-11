import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyDeskLayoutComponent } from './policy-desk-layout.component';

describe('PolicyDeskLayoutComponent', () => {
  let component: PolicyDeskLayoutComponent;
  let fixture: ComponentFixture<PolicyDeskLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyDeskLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyDeskLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
