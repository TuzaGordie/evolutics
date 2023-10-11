import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployinfoComponent } from './employinfo.component';

describe('EmployinfoComponent', () => {
  let component: EmployinfoComponent;
  let fixture: ComponentFixture<EmployinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
