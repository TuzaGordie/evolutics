import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTranslationsMenuComponent } from './create-menu.component';

describe('CreateTranslationsMenuComponent', () => {
  let component: CreateTranslationsMenuComponent;
  let fixture: ComponentFixture<CreateTranslationsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTranslationsMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTranslationsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
