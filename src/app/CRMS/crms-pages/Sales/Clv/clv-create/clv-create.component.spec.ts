import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CLVCreateComponent } from './clv-create.component';

describe('CLVCreateComponent', () => {
  let component: CLVCreateComponent;
  let fixture: ComponentFixture<CLVCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CLVCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CLVCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
