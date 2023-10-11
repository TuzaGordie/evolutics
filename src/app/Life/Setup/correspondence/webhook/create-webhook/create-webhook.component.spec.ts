import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCorrespondenceWebhook } from './create-webhook.component';

describe('CreateCorrespondenceWebhook', () => {
  let component: CreateCorrespondenceWebhook;
  let fixture: ComponentFixture<CreateCorrespondenceWebhook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCorrespondenceWebhook ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCorrespondenceWebhook);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
