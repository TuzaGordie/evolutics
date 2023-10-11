import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCorrespondencePrint } from './create-print.component';

describe('CreateCorrespondencePrint', () => {
  let component: CreateCorrespondencePrint;
  let fixture: ComponentFixture<CreateCorrespondencePrint>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCorrespondencePrint ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCorrespondencePrint);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
