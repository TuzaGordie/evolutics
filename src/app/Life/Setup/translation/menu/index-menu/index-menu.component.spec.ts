import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexTranslationsMenuComponent } from './index-menu.component';

describe('IndexTranslationsMenuComponent', () => {
  let component: IndexTranslationsMenuComponent;
  let fixture: ComponentFixture<IndexTranslationsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexTranslationsMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexTranslationsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
