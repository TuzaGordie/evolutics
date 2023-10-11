import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCodePremiumFrequencyComponent } from './create-premfreq.component';

describe('CreateCodePremiumFrequencyComponent', () => {
  let component: CreateCodePremiumFrequencyComponent;
  let fixture: ComponentFixture<CreateCodePremiumFrequencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCodePremiumFrequencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCodePremiumFrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
