import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShortTermRateComponent } from './create-short-term-rates.component';

describe('CreateShortTermRateComponent', () => {
  let component: CreateShortTermRateComponent;
  let fixture: ComponentFixture<CreateShortTermRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateShortTermRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateShortTermRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
