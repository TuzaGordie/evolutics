import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientWebLoginComponent } from './web-login.component';

describe('WebLoginComponent', () => {
  let component: ClientWebLoginComponent;
  let fixture: ComponentFixture<ClientWebLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientWebLoginComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientWebLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
