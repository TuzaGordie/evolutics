import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindatesComponent } from './admindates.component';

describe('AdmindatesComponent', () => {
  let component: AdmindatesComponent;
  let fixture: ComponentFixture<AdmindatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmindatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmindatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
