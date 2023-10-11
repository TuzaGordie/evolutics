import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnuityDetailsComponent } from './annuity-details.component';

describe('AnnuityDetailsComponent', () => {
  let component: AnnuityDetailsComponent;
  let fixture: ComponentFixture<AnnuityDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnuityDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnuityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
