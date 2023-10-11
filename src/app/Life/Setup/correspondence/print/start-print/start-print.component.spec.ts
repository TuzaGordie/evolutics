import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCorrespondencePrint } from './start-print.component';

describe('StartCorrespondencePrint', () => {
  let component: StartCorrespondencePrint;
  let fixture: ComponentFixture<StartCorrespondencePrint>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartCorrespondencePrint ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartCorrespondencePrint);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
