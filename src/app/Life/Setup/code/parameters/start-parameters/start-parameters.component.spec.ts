import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCodeParametersComponent } from './start-parameters.component';

describe('StartCodeParametersComponent', () => {
  let component: StartCodeParametersComponent;
  let fixture: ComponentFixture<StartCodeParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartCodeParametersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartCodeParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
