import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyAnnuitiesComponent } from './policy-annuities.component';

describe('PolicyAnnuitiesComponent', () => {
  let component: PolicyAnnuitiesComponent;
  let fixture: ComponentFixture<PolicyAnnuitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyAnnuitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyAnnuitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
