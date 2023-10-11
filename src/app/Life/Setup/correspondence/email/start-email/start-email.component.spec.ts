import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCorrespondenceEmail } from './start-email.component';

describe('StartCorrespondenceEmail', () => {
  let component: StartCorrespondenceEmail;
  let fixture: ComponentFixture<StartCorrespondenceEmail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartCorrespondenceEmail ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartCorrespondenceEmail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
