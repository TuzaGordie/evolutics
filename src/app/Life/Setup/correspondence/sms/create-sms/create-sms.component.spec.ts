import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCorrespondenceSMS } from './create-sms.component';

describe('CreateCorrespondenceSMS', () => {
  let component: CreateCorrespondenceSMS;
  let fixture: ComponentFixture<CreateCorrespondenceSMS>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCorrespondenceSMS ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCorrespondenceSMS);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
