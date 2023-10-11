import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewScheduleComponent } from './create-new-schedule.component';

describe('CreateNewScheduleComponent', () => {
  let component: CreateNewScheduleComponent;
  let fixture: ComponentFixture<CreateNewScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
