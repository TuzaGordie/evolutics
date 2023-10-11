import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssetPartnersComponent } from './view-asset-partners.component';

describe('ViewAssetPartnersComponent', () => {
  let component: ViewAssetPartnersComponent;
  let fixture: ComponentFixture<ViewAssetPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAssetPartnersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAssetPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
