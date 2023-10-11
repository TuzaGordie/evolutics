import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowShortTermRatesComponent } from './show-short-term-rates.component';

describe('ShowShortTermRatesComponent', () => {
  let component: ShowShortTermRatesComponent;
  let fixture: ComponentFixture<ShowShortTermRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowShortTermRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowShortTermRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
