import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSetupsTaskSetupComponent } from './create-task-setup.component';

describe('CreateSetupsTaskSetupComponent', () => {
  let component: CreateSetupsTaskSetupComponent;
  let fixture: ComponentFixture<CreateSetupsTaskSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSetupsTaskSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSetupsTaskSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
