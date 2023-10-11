import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCorrespondencePrint } from './index-print.component';

describe('IndexCorrespondencePrint', () => {
  let component: IndexCorrespondencePrint;
  let fixture: ComponentFixture<IndexCorrespondencePrint>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCorrespondencePrint ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCorrespondencePrint);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
