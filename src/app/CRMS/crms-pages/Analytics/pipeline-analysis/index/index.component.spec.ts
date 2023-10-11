import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineIndexComponent } from './index.component';

describe('PipelineIndexComponent', () => {
  let component: PipelineIndexComponent;
  let fixture: ComponentFixture<PipelineIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipelineIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
