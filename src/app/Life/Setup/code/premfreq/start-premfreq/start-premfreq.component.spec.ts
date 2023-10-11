import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCodePremiumFrequencyComponent } from './start-premfreq.component';

describe('StartCodePremiumFrequencyComponent', () => {
  let component: StartCodePremiumFrequencyComponent;
  let fixture: ComponentFixture<StartCodePremiumFrequencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartCodePremiumFrequencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartCodePremiumFrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
