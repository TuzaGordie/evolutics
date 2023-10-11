import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMCorrespondenceWebhookCreateComponent } from './crmcorrespondence-webhook-create.component';

describe('CRMCorrespondenceWebhookCreateComponent', () => {
  let component: CRMCorrespondenceWebhookCreateComponent;
  let fixture: ComponentFixture<CRMCorrespondenceWebhookCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMCorrespondenceWebhookCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMCorrespondenceWebhookCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
