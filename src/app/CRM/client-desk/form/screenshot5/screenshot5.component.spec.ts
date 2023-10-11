import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Screenshot5Component } from './screenshot5.component';

describe('Screenshot5Component', () => {
  let component: Screenshot5Component;
  let fixture: ComponentFixture<Screenshot5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Screenshot5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Screenshot5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
