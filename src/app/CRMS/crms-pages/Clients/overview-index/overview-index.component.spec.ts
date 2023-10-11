import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewIndexComponent } from './overview-index.component';

describe('OverviewIndexComponent', () => {
  let component: OverviewIndexComponent;
  let fixture: ComponentFixture<OverviewIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
