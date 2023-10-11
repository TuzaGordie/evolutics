import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssetEndorsementComponent } from './view-asset-endorsement.component';

describe('ViewAssetEndorsementComponent', () => {
  let component: ViewAssetEndorsementComponent;
  let fixture: ComponentFixture<ViewAssetEndorsementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAssetEndorsementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAssetEndorsementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
