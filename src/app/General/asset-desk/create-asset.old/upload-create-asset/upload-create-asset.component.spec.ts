import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCreateAssetComponent } from './upload-create-asset.component';

describe('UploadCreateAssetComponent', () => {
  let component: UploadCreateAssetComponent;
  let fixture: ComponentFixture<UploadCreateAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCreateAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCreateAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
