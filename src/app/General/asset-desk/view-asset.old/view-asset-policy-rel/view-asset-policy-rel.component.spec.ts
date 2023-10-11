import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssetPolicyRelComponent } from './view-asset-policy-rel.component';

describe('ViewAssetPolicyRelComponent', () => {
  let component: ViewAssetPolicyRelComponent;
  let fixture: ComponentFixture<ViewAssetPolicyRelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAssetPolicyRelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAssetPolicyRelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
