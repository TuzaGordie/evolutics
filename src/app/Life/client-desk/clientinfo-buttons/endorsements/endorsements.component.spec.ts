import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEndorsementsComponent } from './endorsements.component';

describe('EndorsementsComponent', () => {
  let component: ClientEndorsementsComponent;
  let fixture: ComponentFixture<ClientEndorsementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientEndorsementsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientEndorsementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
