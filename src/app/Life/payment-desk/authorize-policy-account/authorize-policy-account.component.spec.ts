import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizePolicyAccountComponent } from './authorize-policy-account.component';

describe('AuthorizePolicyAccountComponent', () => {
  let component: AuthorizePolicyAccountComponent;
  let fixture: ComponentFixture<AuthorizePolicyAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizePolicyAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizePolicyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
