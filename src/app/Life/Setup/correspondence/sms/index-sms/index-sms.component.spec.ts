import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCorrespondenceSMS } from './index-sms.component';

describe('IndexCorrespondenceSMS', () => {
  let component: IndexCorrespondenceSMS;
  let fixture: ComponentFixture<IndexCorrespondenceSMS>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCorrespondenceSMS ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCorrespondenceSMS);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
