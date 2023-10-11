import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupShortTermRatesComponent } from './life-setup-short-term-rates.component';

describe('SetupShortTermRatesComponent', () => {
  let component: SetupShortTermRatesComponent;
  let fixture: ComponentFixture<SetupShortTermRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupShortTermRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupShortTermRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
