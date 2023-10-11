import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunbatchComponent } from './runbatch.component';

describe('RunbatchComponent', () => {
  let component: RunbatchComponent;
  let fixture: ComponentFixture<RunbatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunbatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RunbatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
