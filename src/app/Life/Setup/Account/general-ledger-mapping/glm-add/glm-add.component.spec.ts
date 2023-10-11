import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GLMAddComponent } from './glm-add.component';

describe('GLMAddComponent', () => {
  let component: GLMAddComponent;
  let fixture: ComponentFixture<GLMAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GLMAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GLMAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
