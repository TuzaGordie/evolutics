import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCorrespondenceQuotation } from './create-quotation.component';

describe('CreateCorrespondenceQuotation', () => {
  let component: CreateCorrespondenceQuotation;
  let fixture: ComponentFixture<CreateCorrespondenceQuotation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCorrespondenceQuotation ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCorrespondenceQuotation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
