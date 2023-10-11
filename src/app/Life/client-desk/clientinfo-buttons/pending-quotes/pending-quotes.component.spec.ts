import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPendingQuotesComponent } from './pending-quotes.component';

describe('PendingQuotesComponent', () => {
  let component: ClientPendingQuotesComponent;
  let fixture: ComponentFixture<ClientPendingQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientPendingQuotesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPendingQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
