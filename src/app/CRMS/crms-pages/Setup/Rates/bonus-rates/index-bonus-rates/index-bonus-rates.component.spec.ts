import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexBonusRatesComponent } from './index-bonus-rates.component';

describe('IndexBonusRatesComponent', () => {
  let component: IndexBonusRatesComponent;
  let fixture: ComponentFixture<IndexBonusRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexBonusRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexBonusRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
