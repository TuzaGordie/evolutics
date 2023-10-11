import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualCommissionsComponent } from './manual-commissions.component';

describe('ManualCommissionsComponent', () => {
  let component: ManualCommissionsComponent;
  let fixture: ComponentFixture<ManualCommissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualCommissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualCommissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
