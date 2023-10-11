import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBonusRatesComponent } from './show-bonus-rates.component';

describe('ShowBonusRatesComponent', () => {
  let component: ShowBonusRatesComponent;
  let fixture: ComponentFixture<ShowBonusRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowBonusRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBonusRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
