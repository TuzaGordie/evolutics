import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartTranslationsMenuComponent } from './start-menu.component';

describe('StartTranslationsMenuComponent', () => {
  let component: StartTranslationsMenuComponent;
  let fixture: ComponentFixture<StartTranslationsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartTranslationsMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartTranslationsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
