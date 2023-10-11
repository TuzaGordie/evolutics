import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCorrespondenceWebhook } from './index-webhook.component';

describe('IndexCorrespondenceWebhook', () => {
  let component: IndexCorrespondenceWebhook;
  let fixture: ComponentFixture<IndexCorrespondenceWebhook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCorrespondenceWebhook ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCorrespondenceWebhook);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
