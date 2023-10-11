import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderwritingEventsComponent } from './underwriting-events.component';

describe('UnderwritingEventsComponent', () => {
  let component: UnderwritingEventsComponent;
  let fixture: ComponentFixture<UnderwritingEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnderwritingEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderwritingEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
