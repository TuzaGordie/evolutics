import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Screenshot2Component } from './screenshot2.component';

describe('Screenshot2Component', () => {
  let component: Screenshot2Component;
  let fixture: ComponentFixture<Screenshot2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Screenshot2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Screenshot2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
