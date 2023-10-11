import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewAnnuityComponent } from './create-new-annuity.component';

describe('CreateNewAnnuityComponent', () => {
  let component: CreateNewAnnuityComponent;
  let fixture: ComponentFixture<CreateNewAnnuityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewAnnuityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewAnnuityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
