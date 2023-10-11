import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CLVShowComponent } from './clv-show.component';

describe('CLVShowComponent', () => {
  let component: CLVShowComponent;
  let fixture: ComponentFixture<CLVShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CLVShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CLVShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
