import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssetTrackerComponent } from './view-asset-tracker.component';

describe('ViewAssetTrackerComponent', () => {
  let component: ViewAssetTrackerComponent;
  let fixture: ComponentFixture<ViewAssetTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAssetTrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAssetTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
