import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCorrespondenceEmail } from './create-email.component';

describe('CreateCorrespondenceEmail', () => {
  let component: CreateCorrespondenceEmail;
  let fixture: ComponentFixture<CreateCorrespondenceEmail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCorrespondenceEmail ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCorrespondenceEmail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
