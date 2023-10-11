import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScAnnuityCertainComponent } from './sc-annuity-certain.component';

describe('ScAnnuityCertainComponent', () => {
  let component: ScAnnuityCertainComponent;
  let fixture: ComponentFixture<ScAnnuityCertainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScAnnuityCertainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScAnnuityCertainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
