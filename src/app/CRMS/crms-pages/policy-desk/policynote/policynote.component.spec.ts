import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicynoteComponent } from './policynote.component';

describe('PolicynoteComponent', () => {
  let component: PolicynoteComponent;
  let fixture: ComponentFixture<PolicynoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicynoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicynoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
