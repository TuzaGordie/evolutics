import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSStartSetupsTaskSetupComponent } from './start-task-setup.component';

describe('CRMSStartSetupsTaskSetupComponent', () => {
  let component: CRMSStartSetupsTaskSetupComponent;
  let fixture: ComponentFixture<CRMSStartSetupsTaskSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSStartSetupsTaskSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSStartSetupsTaskSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
