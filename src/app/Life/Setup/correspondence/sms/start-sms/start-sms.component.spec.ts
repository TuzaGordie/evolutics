import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCorrespondenceSMS } from './start-sms.component';

describe('StartCorrespondenceSMS', () => {
  let component: StartCorrespondenceSMS;
  let fixture: ComponentFixture<StartCorrespondenceSMS>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartCorrespondenceSMS ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartCorrespondenceSMS);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
