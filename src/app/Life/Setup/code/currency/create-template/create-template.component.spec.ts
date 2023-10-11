import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTranslationsTemplateComponent } from './create-template.component';

describe('CreateTranslationsTemplateComponent', () => {
  let component: CreateTranslationsTemplateComponent;
  let fixture: ComponentFixture<CreateTranslationsTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTranslationsTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTranslationsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
