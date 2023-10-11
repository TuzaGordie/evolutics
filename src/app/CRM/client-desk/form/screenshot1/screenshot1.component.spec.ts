import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Screenshot1Component } from './screenshot1.component';

describe('Screenshot1Component', () => {
  let component: Screenshot1Component;
  let fixture: ComponentFixture<Screenshot1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Screenshot1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Screenshot1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
