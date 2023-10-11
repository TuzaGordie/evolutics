import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewShowComponent } from './overview-show.component';

describe('OverviewShowComponent', () => {
  let component: OverviewShowComponent;
  let fixture: ComponentFixture<OverviewShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
