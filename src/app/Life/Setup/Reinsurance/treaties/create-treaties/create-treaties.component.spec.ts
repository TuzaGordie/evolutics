import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSetupsReInsuranceTreatiesComponent } from './create-treaties.component';

describe('CreateSetupsReInsuranceTreatiesComponent', () => {
  let component: CreateSetupsReInsuranceTreatiesComponent;
  let fixture: ComponentFixture<CreateSetupsReInsuranceTreatiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSetupsReInsuranceTreatiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSetupsReInsuranceTreatiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
