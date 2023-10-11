import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupCountryComponent } from './country.component';

describe('SetupCountryComponent', () => {
  let component: SetupCountryComponent;
  let fixture: ComponentFixture<SetupCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupCountryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
