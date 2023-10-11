import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientnoteComponent } from './clientnote.component';

describe('ClientnoteComponent', () => {
  let component: ClientnoteComponent;
  let fixture: ComponentFixture<ClientnoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientnoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
