import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupGeneralRatesComponent } from './life-setup-general-rates.component';

describe('SetupGeneralRatesComponent', () => {
  let component: SetupGeneralRatesComponent;
  let fixture: ComponentFixture<SetupGeneralRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupGeneralRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupGeneralRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
