import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartTownComponent } from './start-town.component';

describe('StartTownComponent', () => {
  let component: StartTownComponent;
  let fixture: ComponentFixture<StartTownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartTownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartTownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
