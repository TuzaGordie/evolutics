import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexSetupsReInsuranceTreatiesComponent } from './index-treaties.component';

describe('IndexSetupsReInsuranceTreatiesComponent', () => {
  let component: IndexSetupsReInsuranceTreatiesComponent;
  let fixture: ComponentFixture<IndexSetupsReInsuranceTreatiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexSetupsReInsuranceTreatiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexSetupsReInsuranceTreatiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
