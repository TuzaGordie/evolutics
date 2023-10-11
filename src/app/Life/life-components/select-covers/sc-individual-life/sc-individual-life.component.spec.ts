import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScIndividualLifeComponent } from './sc-individual-life.component';

describe('ScIndividualLifeComponent', () => {
  let component: ScIndividualLifeComponent;
  let fixture: ComponentFixture<ScIndividualLifeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScIndividualLifeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScIndividualLifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
