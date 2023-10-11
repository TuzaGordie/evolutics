import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartGeneralRatesComponent } from './start-general-rates.component';

describe('StartGeneralRatesComponent', () => {
  let component: StartGeneralRatesComponent;
  let fixture: ComponentFixture<StartGeneralRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartGeneralRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartGeneralRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
