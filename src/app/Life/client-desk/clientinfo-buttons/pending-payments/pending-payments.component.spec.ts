import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPendingPaymentsComponent } from './pending-payments.component';

describe('PendingPaymentsComponent', () => {
  let component: ClientPendingPaymentsComponent;
  let fixture: ComponentFixture<ClientPendingPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientPendingPaymentsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPendingPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
