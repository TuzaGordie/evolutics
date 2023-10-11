import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexTranslationsSystemMessageComponent } from './index-system-message.component';

describe('IndexTranslationsSystemMessageComponent', () => {
  let component: IndexTranslationsSystemMessageComponent;
  let fixture: ComponentFixture<IndexTranslationsSystemMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexTranslationsSystemMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexTranslationsSystemMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
