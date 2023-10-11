import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesActivitiesIndexComponent } from './index.component';

describe('SalesActivitiesIndexComponent', () => {
  let component: SalesActivitiesIndexComponent;
  let fixture: ComponentFixture<SalesActivitiesIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesActivitiesIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesActivitiesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
