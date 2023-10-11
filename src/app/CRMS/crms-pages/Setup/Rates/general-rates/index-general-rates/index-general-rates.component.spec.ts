import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexGeneralRatesComponent } from './index-general-rates.component';

describe('IndexGeneralRatesComponent', () => {
  let component: IndexGeneralRatesComponent;
  let fixture: ComponentFixture<IndexGeneralRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexGeneralRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexGeneralRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
