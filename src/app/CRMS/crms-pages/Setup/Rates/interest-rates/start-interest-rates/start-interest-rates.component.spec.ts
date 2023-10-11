import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartInterestRatesComponent } from './start-interest-rates.component';

describe('StartInterestRatesComponent', () => {
  let component: StartInterestRatesComponent;
  let fixture: ComponentFixture<StartInterestRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartInterestRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartInterestRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
