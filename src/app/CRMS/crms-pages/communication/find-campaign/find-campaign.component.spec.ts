import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindCampaignComponent } from './find-campaign.component';

describe('FindCampaignComponent', () => {
  let component: FindCampaignComponent;
  let fixture: ComponentFixture<FindCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindCampaignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
