import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartShortTermRatesComponent } from './start-short-term-rates.component';

describe('StartShortTermRatesComponent', () => {
  let component: StartShortTermRatesComponent;
  let fixture: ComponentFixture<StartShortTermRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartShortTermRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartShortTermRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
