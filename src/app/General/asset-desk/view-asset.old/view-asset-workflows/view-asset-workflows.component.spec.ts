import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssetWorkflowsComponent } from './view-asset-workflows.component';

describe('ViewAssetWorkflowsComponent', () => {
  let component: ViewAssetWorkflowsComponent;
  let fixture: ComponentFixture<ViewAssetWorkflowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAssetWorkflowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAssetWorkflowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
