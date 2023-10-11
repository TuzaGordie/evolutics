import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGeneralRateComponent } from './create-general-rates.component';

describe('CreateGeneralRateComponent', () => {
  let component: CreateGeneralRateComponent;
  let fixture: ComponentFixture<CreateGeneralRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGeneralRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGeneralRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
