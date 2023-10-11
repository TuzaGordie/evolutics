import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCorrespondenceEmail } from './index-email.component';

describe('IndexCorrespondenceEmail', () => {
  let component: IndexCorrespondenceEmail;
  let fixture: ComponentFixture<IndexCorrespondenceEmail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCorrespondenceEmail ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCorrespondenceEmail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
