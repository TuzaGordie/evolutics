import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexFindAssetComponent } from './index-find-asset.component';

describe('IndexFindAssetComponent', () => {
  let component: IndexFindAssetComponent;
  let fixture: ComponentFixture<IndexFindAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexFindAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexFindAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
