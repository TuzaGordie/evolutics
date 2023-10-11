import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowGeneralRatesComponent } from './show-general-rates.component';

describe('ShowGeneralRatesComponent', () => {
  let component: ShowGeneralRatesComponent;
  let fixture: ComponentFixture<ShowGeneralRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowGeneralRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowGeneralRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
