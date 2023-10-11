import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCodeParametersComponent } from './create-parameters.component';

describe('CreateCodeParametersComponent', () => {
  let component: CreateCodeParametersComponent;
  let fixture: ComponentFixture<CreateCodeParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCodeParametersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCodeParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
