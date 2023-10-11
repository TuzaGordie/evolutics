import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCreateAssetComponent } from './start-create-asset.component';

describe('StartCreateAssetComponent', () => {
  let component: StartCreateAssetComponent;
  let fixture: ComponentFixture<StartCreateAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartCreateAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartCreateAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
