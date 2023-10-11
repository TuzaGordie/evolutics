import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminusershowComponent } from './adminusershow.component';

describe('AdminusershowComponent', () => {
  let component: AdminusershowComponent;
  let fixture: ComponentFixture<AdminusershowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminusershowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminusershowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
