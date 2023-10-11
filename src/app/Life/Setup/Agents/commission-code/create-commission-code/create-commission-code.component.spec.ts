import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSetupsCommissionCodeComponent } from './create-commission-code.component';

describe('CreateSetupsCommissionCodeComponent', () => {
  let component: CreateSetupsCommissionCodeComponent;
  let fixture: ComponentFixture<CreateSetupsCommissionCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSetupsCommissionCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSetupsCommissionCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
