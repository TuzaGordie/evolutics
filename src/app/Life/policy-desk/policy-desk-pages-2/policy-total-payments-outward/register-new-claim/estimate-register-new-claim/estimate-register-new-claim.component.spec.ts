import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimateRegisterNewClaimComponent } from './estimate-register-new-claim.component';

describe('EstimateRegisterNewClaimComponent', () => {
  let component: EstimateRegisterNewClaimComponent;
  let fixture: ComponentFixture<EstimateRegisterNewClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimateRegisterNewClaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimateRegisterNewClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
