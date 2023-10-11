import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSIndexSetupsTaskSetupComponent } from './index-task-setup.component';

describe('CRMSIndexSetupsTaskSetupComponent', () => {
  let component: CRMSIndexSetupsTaskSetupComponent;
  let fixture: ComponentFixture<CRMSIndexSetupsTaskSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSIndexSetupsTaskSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSIndexSetupsTaskSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
