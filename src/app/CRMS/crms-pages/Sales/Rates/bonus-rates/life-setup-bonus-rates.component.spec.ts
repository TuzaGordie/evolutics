import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupBonusRatesComponent } from './life-setup-bonus-rates.component';

describe('SetupBonusRatesComponent', () => {
  let component: SetupBonusRatesComponent;
  let fixture: ComponentFixture<SetupBonusRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupBonusRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupBonusRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
