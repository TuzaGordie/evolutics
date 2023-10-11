import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartSetupsTaskSetupComponent } from './start-task-setup.component';

describe('StartSetupsTaskSetupComponent', () => {
  let component: StartSetupsTaskSetupComponent;
  let fixture: ComponentFixture<StartSetupsTaskSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartSetupsTaskSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartSetupsTaskSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
