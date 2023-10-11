import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSLifeSetupProductCodeComponent } from './life-setup-product-code.component';

describe('CRMSLifeSetupProductCodeComponent', () => {
  let component: CRMSLifeSetupProductCodeComponent;
  let fixture: ComponentFixture<CRMSLifeSetupProductCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSLifeSetupProductCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSLifeSetupProductCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
