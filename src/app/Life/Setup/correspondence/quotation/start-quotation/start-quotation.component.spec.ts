import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCorrespondenceQuotation } from './start-quotation.component';

describe('StartCorrespondenceQuotation', () => {
  let component: StartCorrespondenceQuotation;
  let fixture: ComponentFixture<StartCorrespondenceQuotation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartCorrespondenceQuotation ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartCorrespondenceQuotation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
