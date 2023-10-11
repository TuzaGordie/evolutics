import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNewClaimComponent } from './register-new-claim.component';

describe('RegisterNewClaimComponent', () => {
  let component: RegisterNewClaimComponent;
  let fixture: ComponentFixture<RegisterNewClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterNewClaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNewClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
