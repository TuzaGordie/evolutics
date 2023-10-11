import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInterestRatesComponent } from './show-interest-rates.component';

describe('ShowInterestRatesComponent', () => {
  let component: ShowInterestRatesComponent;
  let fixture: ComponentFixture<ShowInterestRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowInterestRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowInterestRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
