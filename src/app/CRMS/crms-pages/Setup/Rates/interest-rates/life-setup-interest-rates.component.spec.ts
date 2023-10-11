import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupInterestRatesComponent } from './life-setup-interest-rates.component';

describe('SetupInterestRatesComponent', () => {
  let component: SetupInterestRatesComponent;
  let fixture: ComponentFixture<SetupInterestRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupInterestRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupInterestRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
