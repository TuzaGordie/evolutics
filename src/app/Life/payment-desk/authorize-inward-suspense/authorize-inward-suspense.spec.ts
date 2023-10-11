import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeInwardSuspenseComponent } from './authorize-inward-suspense.component';

describe('AuthorizeInwardSuspenseComponent', () => {
  let component: AuthorizeInwardSuspenseComponent;
  let fixture: ComponentFixture<AuthorizeInwardSuspenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizeInwardSuspenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizeInwardSuspenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
