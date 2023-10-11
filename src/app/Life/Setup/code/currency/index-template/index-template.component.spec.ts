import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexTranslationsTemplateComponent } from './index-template.component';

describe('IndexTranslationsTemplateComponent', () => {
  let component: IndexTranslationsTemplateComponent;
  let fixture: ComponentFixture<IndexTranslationsTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexTranslationsTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexTranslationsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
