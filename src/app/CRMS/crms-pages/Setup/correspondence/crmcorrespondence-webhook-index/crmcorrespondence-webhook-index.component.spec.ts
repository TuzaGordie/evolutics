import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMCorrespondenceWebhookIndexComponent } from './crmcorrespondence-webhook-index.component';

describe('CRMCorrespondenceWebhookIndexComponent', () => {
  let component: CRMCorrespondenceWebhookIndexComponent;
  let fixture: ComponentFixture<CRMCorrespondenceWebhookIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMCorrespondenceWebhookIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMCorrespondenceWebhookIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
