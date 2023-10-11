import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBonusRateComponent } from './create-bonus-rates.component';

describe('CreateBonusRateComponent', () => {
  let component: CreateBonusRateComponent;
  let fixture: ComponentFixture<CreateBonusRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBonusRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBonusRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
