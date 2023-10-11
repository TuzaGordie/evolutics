import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchlogComponent } from './batchlog.component';

describe('BatchlogComponent', () => {
  let component: BatchlogComponent;
  let fixture: ComponentFixture<BatchlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
