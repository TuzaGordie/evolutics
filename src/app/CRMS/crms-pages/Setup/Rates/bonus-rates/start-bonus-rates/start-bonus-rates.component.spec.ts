import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartBonusRatesComponent } from './start-bonus-rates.component';

describe('StartBonusRatesComponent', () => {
  let component: StartBonusRatesComponent;
  let fixture: ComponentFixture<StartBonusRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartBonusRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartBonusRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
