import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScIndividualCreditComponent } from './sc-individual-credit.component';

describe('ScIndividualCreditComponent', () => {
  let component: ScIndividualCreditComponent;
  let fixture: ComponentFixture<ScIndividualCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScIndividualCreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScIndividualCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
