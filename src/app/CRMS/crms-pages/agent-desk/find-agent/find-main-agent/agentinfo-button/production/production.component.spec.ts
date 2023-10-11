import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSProductionComponent } from './production.component';

describe('CRMSProductionComponent', () => {
  let component: CRMSProductionComponent;
  let fixture: ComponentFixture<CRMSProductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSProductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
