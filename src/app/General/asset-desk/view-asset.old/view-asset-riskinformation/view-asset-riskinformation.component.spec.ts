import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssetRiskinformationComponent } from './view-asset-riskinformation.component';

describe('ViewAssetRiskinformationComponent', () => {
  let component: ViewAssetRiskinformationComponent;
  let fixture: ComponentFixture<ViewAssetRiskinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAssetRiskinformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAssetRiskinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
