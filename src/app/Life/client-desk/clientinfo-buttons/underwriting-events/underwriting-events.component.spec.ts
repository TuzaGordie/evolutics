import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientUnderwritingEventsComponent } from './underwriting-events.component';

describe('UnderwritingEventsComponent', () => {
  let component: ClientUnderwritingEventsComponent;
  let fixture: ComponentFixture<ClientUnderwritingEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientUnderwritingEventsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientUnderwritingEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
