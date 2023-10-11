import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Screenshot4Component } from './screenshot4.component';

describe('Screenshot4Component', () => {
  let component: Screenshot4Component;
  let fixture: ComponentFixture<Screenshot4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Screenshot4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Screenshot4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
