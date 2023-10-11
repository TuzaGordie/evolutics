import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexShortTermRatesComponent } from './index-short-term-rates.component';

describe('IndexShortTermRatesComponent', () => {
  let component: IndexShortTermRatesComponent;
  let fixture: ComponentFixture<IndexShortTermRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexShortTermRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexShortTermRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
