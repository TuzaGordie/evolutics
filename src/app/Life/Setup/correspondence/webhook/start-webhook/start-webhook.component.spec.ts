import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCorrespondenceWebhook } from './start-webhook.component';

describe('StartCorrespondenceWebhook', () => {
  let component: StartCorrespondenceWebhook;
  let fixture: ComponentFixture<StartCorrespondenceWebhook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartCorrespondenceWebhook ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartCorrespondenceWebhook);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
