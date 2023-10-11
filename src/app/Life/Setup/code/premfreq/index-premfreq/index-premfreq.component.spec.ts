import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCodePremiumFrequencyComponent } from './index-premfreq.component';

describe('IndexCodePremiumFrequencyComponent', () => {
  let component: IndexCodePremiumFrequencyComponent;
  let fixture: ComponentFixture<IndexCodePremiumFrequencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCodePremiumFrequencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCodePremiumFrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
