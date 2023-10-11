import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInterestRateComponent } from './create-interest-rates.component';

describe('CreateInterestRateComponent', () => {
  let component: CreateInterestRateComponent;
  let fixture: ComponentFixture<CreateInterestRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateInterestRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInterestRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
