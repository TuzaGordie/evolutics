import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSCreateSetupsTaskSetupComponent } from './create-task-setup.component';

describe('CRMSCreateSetupsTaskSetupComponent', () => {
  let component: CRMSCreateSetupsTaskSetupComponent;
  let fixture: ComponentFixture<CRMSCreateSetupsTaskSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSCreateSetupsTaskSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSCreateSetupsTaskSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
