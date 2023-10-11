import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCorrespondenceQuotation } from './index-quotation.component';

describe('IndexCorrespondenceQuotation', () => {
  let component: IndexCorrespondenceQuotation;
  let fixture: ComponentFixture<IndexCorrespondenceQuotation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCorrespondenceQuotation ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCorrespondenceQuotation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
