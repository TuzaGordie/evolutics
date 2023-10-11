import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTranslationsSystemMessageComponent } from './create-system-message.component';

describe('CreateTranslationsSystemMessageComponent', () => {
  let component: CreateTranslationsSystemMessageComponent;
  let fixture: ComponentFixture<CreateTranslationsSystemMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTranslationsSystemMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTranslationsSystemMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
