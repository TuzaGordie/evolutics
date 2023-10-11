import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCreateAssetComponent } from './index-create-asset.component';

describe('IndexCreateAssetComponent', () => {
  let component: IndexCreateAssetComponent;
  let fixture: ComponentFixture<IndexCreateAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCreateAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCreateAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
