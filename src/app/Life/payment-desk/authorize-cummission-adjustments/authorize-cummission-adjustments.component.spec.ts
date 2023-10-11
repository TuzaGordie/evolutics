import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeCummissionAdjustmentsComponent } from './authorize-cummission-adjustments.component';

describe('AuthorizeCummissionAdjustmentsComponent', () => {
  let component: AuthorizeCummissionAdjustmentsComponent;
  let fixture: ComponentFixture<AuthorizeCummissionAdjustmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizeCummissionAdjustmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizeCummissionAdjustmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
