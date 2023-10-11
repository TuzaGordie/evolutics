import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexIndividualAppraisalComponent } from './index-individual-appraisal.component';

describe('IndexIndividualAppraisalComponent', () => {
  let component: IndexIndividualAppraisalComponent;
  let fixture: ComponentFixture<IndexIndividualAppraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexIndividualAppraisalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexIndividualAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
