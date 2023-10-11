import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartSetupsReInsuranceTreatiesComponent } from './start-treaties.component';

describe('StartSetupsReInsuranceTreatiesComponent', () => {
  let component: StartSetupsReInsuranceTreatiesComponent;
  let fixture: ComponentFixture<StartSetupsReInsuranceTreatiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartSetupsReInsuranceTreatiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartSetupsReInsuranceTreatiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
