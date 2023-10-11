import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMSCreateCloneProductCodeComponent } from './create-clone-product-code.component';

describe('CRMSCreateCloneProductCodeComponent', () => {
  let component: CRMSCreateCloneProductCodeComponent;
  let fixture: ComponentFixture<CRMSCreateCloneProductCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRMSCreateCloneProductCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMSCreateCloneProductCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
