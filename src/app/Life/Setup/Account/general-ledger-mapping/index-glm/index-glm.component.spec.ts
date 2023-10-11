import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexGLMComponent } from './index-glm.component';

describe('IndexGLMComponent', () => {
  let component: IndexGLMComponent;
  let fixture: ComponentFixture<IndexGLMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexGLMComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexGLMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
