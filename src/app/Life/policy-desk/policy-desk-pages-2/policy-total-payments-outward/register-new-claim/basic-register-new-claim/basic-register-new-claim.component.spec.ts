import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicRegisterNewClaimComponent } from './basic-register-new-claim.component';

describe('BasicRegisterNewClaimComponent', () => {
  let component: BasicRegisterNewClaimComponent;
  let fixture: ComponentFixture<BasicRegisterNewClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicRegisterNewClaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicRegisterNewClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
