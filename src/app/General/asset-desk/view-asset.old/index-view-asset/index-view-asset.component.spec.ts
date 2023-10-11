import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexViewAssetComponent } from './index-view-asset.component';

describe('IndexViewAssetComponent', () => {
  let component: IndexViewAssetComponent;
  let fixture: ComponentFixture<IndexViewAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexViewAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexViewAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
