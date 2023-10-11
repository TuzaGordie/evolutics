import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatebatchComponent } from './createbatch.component';

describe('CreatebatchComponent', () => {
  let component: CreatebatchComponent;
  let fixture: ComponentFixture<CreatebatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatebatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatebatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
