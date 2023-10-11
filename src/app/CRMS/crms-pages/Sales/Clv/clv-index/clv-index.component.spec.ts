import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CLVIndexComponent } from './clv-index.component';

describe('CLVIndexComponent', () => {
  let component: CLVIndexComponent;
  let fixture: ComponentFixture<CLVIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CLVIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CLVIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
