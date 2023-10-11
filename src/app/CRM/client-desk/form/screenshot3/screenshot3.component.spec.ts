import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Screenshot3Component } from './screenshot3.component';

describe('Screenshot3Component', () => {
  let component: Screenshot3Component;
  let fixture: ComponentFixture<Screenshot3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Screenshot3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Screenshot3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
