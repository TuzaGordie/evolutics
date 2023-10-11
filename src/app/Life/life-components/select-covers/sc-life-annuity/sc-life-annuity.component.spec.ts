import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScLifeAnnuityComponent } from './sc-life-annuity.component';

describe('ScLifeAnnuityComponent', () => {
  let component: ScLifeAnnuityComponent;
  let fixture: ComponentFixture<ScLifeAnnuityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScLifeAnnuityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScLifeAnnuityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
