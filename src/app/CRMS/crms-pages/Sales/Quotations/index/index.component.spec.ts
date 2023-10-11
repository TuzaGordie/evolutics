import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationsIndexComponent } from './index.component';

describe('QuotationsIndexComponent', () => {
  let component: QuotationsIndexComponent;
  let fixture: ComponentFixture<QuotationsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationsIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
