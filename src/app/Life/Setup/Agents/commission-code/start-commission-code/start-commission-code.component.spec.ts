import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartSetupsCommissionCodeComponent } from './start-commission-code.component';

describe('StartSetupsCommissionCodeComponent', () => {
  let component: StartSetupsCommissionCodeComponent;
  let fixture: ComponentFixture<StartSetupsCommissionCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartSetupsCommissionCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartSetupsCommissionCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
