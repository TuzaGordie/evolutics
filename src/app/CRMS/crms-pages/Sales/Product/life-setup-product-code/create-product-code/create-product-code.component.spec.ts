import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSCreateProductCodeComponent } from './create-product-code.component';

describe('CRMSCreateProductCodeComponent', () => {
  let component: CRMSCreateProductCodeComponent;
  let fixture: ComponentFixture<CRMSCreateProductCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSCreateProductCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSCreateProductCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
